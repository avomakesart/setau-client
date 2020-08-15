import React, { useEffect, useState } from 'react'
import { useForm } from '../../../../../../hooks/useForm'
import { fetchData } from '../../../../../../helpers/fetch'
import Swal from 'sweetalert2'
import Input from '../../../../../../components/ui/Input/Input'
import TextArea from '../../../../../../components/ui/TextArea/TextArea'
import {
  Button,
  DisabledButton,
  Container,
  Row,
  ColumnRow,
  Card,
  CardBody,
  NavLink,
} from '../../Home.styles'
import { useParams, useHistory } from 'react-router-dom'
import Navbar from '../../../../ui/Navbar/Navbar'
import { SectionColumn } from '../../../../ui/Section/Section'
import { Sidebar } from '../../../../../../components/ui/Sidebar/Sidebar'

export const UpdateIcons = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [formValues, handleChange] = useForm({
    icon_image: '',
    icon_title: '',
    icon_description: '',
  })

  const { icon_image, icon_title, icon_description } = formValues

  const { id } = useParams()
  const history = useHistory()

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `icon_values/${id}`,
        {
          icon_image,
          icon_title,
          icon_description,
        },
        'PUT'
      )

      const body = await resp.json()

      if (body) {
        setUpdateValues(true)
      }
    } catch (err) {
      setUpdateValues(false)
      Swal.fire('Algo salio mal :(', `${err.message}!`, 'error')
      console.log(err.message)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getTestimonialInfo = async () => {
      try {
        const resp = await fetchData(`icon_values/${id}`, { signal: signal })
        const testimonials = await resp.json()

        setUpdateValues(testimonials)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTestimonialInfo()
    return function cleanup() {
      abortController.abort()
    }
  }, [id])

  return (
    <>
      <Navbar />
      <SectionColumn>
        <Container>
          <Row>
            <ColumnRow>
              <Card>
                <CardBody>
                  {updateValues.map((update) => (
                    <div key={update.id}>
                      <Input
                        id="icon_image"
                        type="text"
                        name="icon_image"
                        value={icon_image}
                        label="Imagen:"
                        placeholder={update.icon_image}
                        onChange={handleChange}
                      />
                      <Input
                        id="icon_title"
                        type="text"
                        name="icon_title"
                        value={icon_title}
                        label="Nombre:"
                        placeholder={update.icon_title}
                        onChange={handleChange}
                      />
                      <TextArea
                        id="icon_description"
                        type="textarea"
                        name="icon_description"
                        value={icon_description}
                        label="Descripción:"
                        rows="5"
                        placeholder={update.icon_description}
                        onChange={handleChange}
                      />

                      {
                        (icon_image,
                        icon_title,
                        icon_description ? (
                          <Button onClick={handleUpdate} type="submit">
                            Actualizar testimonial
                          </Button>
                        ) : (
                          <DisabledButton disabled>
                            Actualizar testimonial
                          </DisabledButton>
                        ))
                      }
                      <br />
                      <Button onClick={handleReturn} typs="button">
                        Regresar
                      </Button>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </ColumnRow>
          </Row>
        </Container>
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
