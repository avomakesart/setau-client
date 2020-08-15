import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import Input from '../../../../../../components/ui/Input/Input'
import Navbar from '../../../../ui/Navbar/Navbar'
import { SectionColumn } from '../../../../ui/Section/Section'
import { Sidebar } from '../../../../../../components/ui/Sidebar/Sidebar'
import {
  Card,
  CardBody,
  Button,
  DisabledButton,
  NavLink,
} from '../../Home.styles'

export const UpdateCta = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [formValues, handleChange] = useForm({
    cta_button_color: '#ffffff',
    cta_button_background_color: '#191919',
    cta_button_text: '',
    cta_subtitle: '',
    cta_title: '',
  })

  const {
    cta_button_color,
    cta_button_background_color,
    cta_button_text,
    cta_subtitle,
    cta_title,
  } = formValues

  const id = updateValues.map((value) => value.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `homepage_cta/${id}`,
        {
          cta_button_color,
          cta_button_background_color,
          cta_button_text,
          cta_subtitle,
          cta_title,
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
        const resp = await fetchData(`homepage_cta`, {
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
          <h4 className="center">Actualizar Acción del usuario</h4>
          {updateValues.map((update) => (
            <CardBody key={update.id}>
              <Input
                id="cta_title"
                type="text"
                name="cta_title"
                value={cta_title}
                label="Titulo"
                placeholder={update.cta_title}
                onChange={handleChange}
              />

              <Input
                id="cta_subtitle"
                type="text"
                name="cta_subtitle"
                value={cta_subtitle}
                label="Titulo"
                placeholder={update.cta_subtitle}
                onChange={handleChange}
              />

              <Input
                id="cta_button_text"
                type="text"
                name="cta_button_text"
                value={cta_button_text}
                label="Texto del boton:"
                placeholder={update.cta_button_text}
                onChange={handleChange}
              />

              <Input
                id="cta_button_color"
                type="color"
                name="cta_button_color"
                value={cta_button_color}
                label="Color del boton:"
                placeholder={update.cta_button_color}
                onChange={handleChange}
              />

              <Input
                id="cta_button_background_color"
                type="color"
                name="cta_button_background_color"
                value={cta_button_background_color}
                label="Color de fondo del botón:"
                placeholder={update.cta_button_background_color}
                onChange={handleChange}
              />

              {
                (cta_button_color,
                cta_button_background_color,
                cta_button_text,
                cta_subtitle,
                cta_title ? (
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
