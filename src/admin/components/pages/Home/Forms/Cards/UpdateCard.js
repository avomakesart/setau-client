import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import Input from '../../../../../../components/ui/Input/Input'
import TextArea from '../../../../../../components/ui/TextArea/TextArea'
import {
  Card,
  CardBody,
  Button,
  DisabledButton,
  NavLink,
} from '../../Home.styles'
import { SectionColumn } from '../../../../ui/Section/Section'
import Navbar from '../../../../ui/Navbar/Navbar'
import { Sidebar } from '../../../../../../components/ui/Sidebar/Sidebar'

export const UpdateCard = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [formValues, handleChange] = useForm({
    homepage_card_title: '',
    homepage_card_desc: '',
    homepage_card_button_text: '',
    homepage_card_button_color: '',
    homepage_card_img: '',
  })

  const {
    homepage_card_title,
    homepage_card_desc,
    homepage_card_button_text,
    homepage_card_button_color,
    homepage_card_img,
  } = formValues

  const id = updateValues.map((value) => value.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `home_card/${id}`,
        {
          homepage_card_title,
          homepage_card_desc,
          homepage_card_button_text,
          homepage_card_button_color,
          homepage_card_img,
        },
        'PUT'
      )
      const body = await JSON.stringify(resp)
      if (body) {
        Swal.fire(
          'Correct',
          `Se actualizaron el icono correctamente`,
          'success'
        ).then(
          setTimeout(() => {
            window.location.reload(true)
          }, 2000)
        )
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getCardValues = async () => {
      try {
        const resp = await fetchData(`home_card`, {
          signal: signal,
        })
        const vals = await resp.json()
        setUpdateValues(vals)
      } catch (error) {
        console.log(error.message)
      }
    }

    getCardValues()

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <>
      <Navbar />
      <SectionColumn>
        <Card>
          <h4 className="center">Actualizar Primer Tarjeta</h4>
          {updateValues.map((update) => (
            <CardBody key={update.id}>
              <Input
                id="homepage_card_title"
                type="text"
                name="homepage_card_title"
                value={homepage_card_title}
                label="Titulo"
                placeholder={update.homepage_card_title}
                onChange={handleChange}
              />

              <TextArea
                id="homepage_card_desc"
                type="textarea"
                name="homepage_card_desc"
                value={homepage_card_desc}
                label="Descripción:"
                rows="5"
                placeholder={update.homepage_card_desc}
                onChange={handleChange}
              />

              <Input
                id="homepage_card_button_text"
                type="text"
                name="homepage_card_button_text"
                value={homepage_card_button_text}
                label="Texto del boton:"
                placeholder={update.homepage_card_button_text}
                onChange={handleChange}
              />

              <Input
                id="homepage_card_button_color"
                type="text"
                name="homepage_card_button_color"
                value={homepage_card_button_color}
                label="Color del boton:"
                placeholder={update.homepage_card_button_color}
                onChange={handleChange}
              />

              <Input
                id="homepage_card_img"
                type="text"
                name="homepage_card_img"
                value={homepage_card_img}
                label="Imagen:"
                placeholder={update.homepage_card_img}
                onChange={handleChange}
              />

              {
                (homepage_card_title,
                homepage_card_desc,
                homepage_card_button_text,
                homepage_card_button_color,
                homepage_card_img ? (
                  <Button onClick={handleUpdate} type="submit">
                    Actulizar Tarjeta
                  </Button>
                ) : (
                  <DisabledButton disabled>Actulizar Tarjeta</DisabledButton>
                ))
              }
            </CardBody>
          ))}
        </Card>
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
