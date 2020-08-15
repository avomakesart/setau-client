import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import Input from '../../../../../../components/ui/Input/Input'
import { useForm } from '../../../../../../hooks/useForm'

import {
  Card,
  CardBody,
  Button,
  DisabledButton,
  NavLink,
} from '../../Home.styles'
import Navbar from '../../../../ui/Navbar/Navbar'
import { SectionColumn } from '../../../../ui/Section/Section'
import { Sidebar } from '../../../../../../components/ui/Sidebar/Sidebar'

export const UpdateHero = () => {
  const [updateHero, setUpdateHero] = useState([])
  const [formValues, handleChange] = useForm({
    hero_title: '',
    hero_subtitle: '',
    hero_image: '',
    hero_button_text: '',
    hero_button_color: '#ffffff',
    hero_button_background_color: '#191919',
  })

  const {
    hero_title,
    hero_subtitle,
    hero_image,
    hero_button_text,
    hero_button_color,
    hero_button_background_color,
  } = formValues

  console.log('Color:', hero_button_color)
  console.log('Background:', hero_button_background_color)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getHeroInfo = async () => {
      try {
        const resp = await fetchData(`homepage_hero`, {
          signal: signal,
        })
        const contact = await resp.json()
        console.log(contact)
        setUpdateHero(contact)
      } catch (error) {
        console.log(error.message)
      }
    }

    getHeroInfo()

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const Id = updateHero.map((user) => user.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `homepage_hero/${Id}`,
        {
          hero_title,
          hero_subtitle,
          hero_image,
          hero_button_text,
          hero_button_color,
          hero_button_background_color,
        },
        'PUT'
      )
      const body = await resp.json()
      if (body) {
        Swal.fire(
          'Correct',
          `Se actualizo el hero de la pagina de inicio`,
          'success'
        )
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <SectionColumn>
        <Card>
          <CardBody>
            {updateHero.map((update) => (
              <div key={update.id}>
                <h4>Encabezado de inicio</h4>

                <Input
                  id="hero_title"
                  type="text"
                  name="hero_title"
                  value={hero_title}
                  label="Titulo:"
                  placeholder={update.hero_title}
                  onChange={handleChange}
                />

                <Input
                  id="hero_subtitle"
                  type="text"
                  name="hero_subtitle"
                  value={hero_subtitle}
                  label="Subtitulo"
                  placeholder={update.hero_subtitle}
                  onChange={handleChange}
                />

                <Input
                  id="hero_image"
                  type="text"
                  name="hero_image"
                  value={hero_image}
                  label="Imagen:"
                  placeholder={update.hero_image}
                  onChange={handleChange}
                />

                <Input
                  id="hero_button_text"
                  type="text"
                  name="hero_button_text"
                  value={hero_button_text}
                  label="Texto del boton"
                  placeholder={update.hero_button_text}
                  onChange={handleChange}
                />
                <Input
                  id="hero_button_color"
                  type="color"
                  name="hero_button_color"
                  value={hero_button_color}
                  label="Color de texto del botón:"
                  onChange={handleChange}
                />

                <Input
                  id="hero_button_background_color"
                  type="color"
                  name="hero_button_background_color"
                  value={hero_button_background_color}
                  label="Color de fondo del botón:"
                  onChange={handleChange}
                />
              </div>
            ))}
            {
              (hero_title,
              hero_subtitle,
              hero_image,
              hero_button_text,
              hero_button_color,
              hero_button_background_color ? (
                <Button onClick={handleUpdate} type="submit">
                  Actulizar Encabezado de Inicio
                </Button>
              ) : (
                <DisabledButton disabled>
                  Actulizar Encabezado de Inicio
                </DisabledButton>
              ))
            }
          </CardBody>
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
