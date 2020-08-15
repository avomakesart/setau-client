import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import Input from '../../../../../../components/ui/Input/Input'
import TextArea from '../../../../../../components/ui/TextArea/TextArea'
import { SectionColumn } from '../../../../ui/Section/Section'
import Navbar from '../../../../ui/Navbar/Navbar'
import AboutEditMenu from '../../AboutEditMenu'

import { Card, CardBody, Button, DisabledButton } from '../../About.styles'

export const UpdateAboutSecondCard = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [formValues, handleChange] = useForm({
    card_title: '',
    card_desc: '',
    card_button_text: '',
    card_button_color: '',
    card_button_background_color: '',
    card_img: '',
  })

  const {
    card_title,
    card_desc,
    card_button_text,
    card_button_color,
    card_button_background_color,
    card_img,
  } = formValues

  const id = updateValues.map((value) => value.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `about_second_card/${id}`,
        {
          card_title,
          card_desc,
          card_button_text,
          card_button_color,
          card_button_background_color,
          card_img,
        },
        'PUT'
      )
      const body = await JSON.stringify(resp)
      if (body) {
        Swal.fire(
          'Correct',
          `Se actualizo la tarjeta correctamente`,
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
        const resp = await fetchData(`about_second_card`, {
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
          <h4 className="center">Actualizar Segunda Tarjeta</h4>
          {updateValues.map((update) => (
            <CardBody key={update.id}>
              <Input
                id="card_title"
                type="text"
                name="card_title"
                value={card_title}
                label="Titulo"
                placeholder={update.card_title}
                onChange={handleChange}
              />

              <TextArea
                id="card_desc"
                type="textarea"
                name="card_desc"
                value={card_desc}
                label="Descripción:"
                rows="5"
                placeholder={update.card_desc}
                onChange={handleChange}
              />

              <Input
                id="card_button_text"
                type="text"
                name="card_button_text"
                value={card_button_text}
                label="Texto del boton:"
                placeholder={update.card_button_text}
                onChange={handleChange}
              />

              <Input
                id="card_button_color"
                type="color"
                name="card_button_color"
                value={card_button_color}
                label="Color del boton:"
                placeholder={update.card_button_color}
                onChange={handleChange}
              />

              <Input
                id="card_button_background_color"
                type="color"
                name="card_button_background_color"
                value={card_button_background_color}
                label="Color de fondo del boton:"
                placeholder={update.card_button_background_color}
                onChange={handleChange}
              />

              <Input
                id="card_img"
                type="text"
                name="card_img"
                value={card_img}
                label="Imagen:"
                placeholder={update.card_img}
                onChange={handleChange}
              />

              {
                (card_title,
                card_desc,
                card_button_text,
                card_button_color,
                card_button_background_color,
                card_img ? (
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
        <AboutEditMenu />
      </div>
    </>
  )
}
