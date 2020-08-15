import React, { useState, useEffect } from 'react'
import { fetchData } from '../../../../../../helpers/fetch'
import Navbar from '../../../../ui/Navbar/Navbar'
import { SectionColumn } from '../../../../ui/Section/Section'
import { Sidebar } from '../../../../../../components/ui/Sidebar/Sidebar'
import {
  Card,
  NavLink,
  CardBody,
  LinkButton,
  ButtonContainer,
  DangerButton,
  ValuesGrid,
  ValueCard,
  IconImage,
} from '../../Home.styles'
import Swal from 'sweetalert2'

export const UpdateIconValues = () => {
  const [updateValues, setUpdateValues] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getCompanyValues = async () => {
      try {
        const resp = await fetchData(`icon_values`, {
          signal: signal,
        })
        const vals = await resp.json()
        setUpdateValues(vals)
      } catch (error) {
        console.log(error.message)
      }
    }

    getCompanyValues()

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'crimson',
      cancelButtonColor: 'black',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Borrado!', 'El testimonial se a borrado.', 'success')
        fetchData(`icon_values/${id}`, {}, 'DELETE')
        const filteteredCustomerID = updateValues.filter((t) => t.id !== id)
        setUpdateValues(filteteredCustomerID)
        window.location.reload(true)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Tu testimonial esta a salvo',
          icon: 'error',
          confirmButtonColor: 'black',
        })
      }
    })
  }

  return (
    <>
      <Navbar />
      <SectionColumn>
        {updateValues.map((uv) => (
          <Card key={uv.id}>
            <CardBody>
              <ValuesGrid>
                <ValueCard key={uv.id}>
                  <IconImage src={uv.icon_image} alt={uv.icon_title} />
                  <h5>{uv.icon_title}</h5>
                  <p>{uv.icon_description}</p>
                </ValueCard>
                <ButtonContainer>
                  <LinkButton to={`/pages/home/edit-values-icons/${uv.id}`}>
                    Actualizar Testimonial
                  </LinkButton>
                  <DangerButton
                    type="button"
                    onClick={() => handleDelete(uv.id)}
                  >
                    Eliminar Testimonial
                  </DangerButton>
                </ButtonContainer>
              </ValuesGrid>
            </CardBody>
          </Card>
        ))}
      </SectionColumn>
      <div>
        <Sidebar>
          <NavLink to="/pages/home/edit-hero">Encabezado</NavLink>
          <NavLink to="/pages/home/edit-values">Seccion Valores</NavLink>
          <NavLink to="/pages/home/edit-values-icons">
            Iconos de valores
          </NavLink>
          <NavLink to="/pages/home/edit-card">Primer Tarjeta</NavLink>
          <NavLink to="/pages/home/edit-second-card">Segunda Tarjeta</NavLink>
          <NavLink to="/pages/home/testimonials">Testimoniales</NavLink>
        </Sidebar>
      </div>
    </>
  )
}
