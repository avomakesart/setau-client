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
} from '../../Home.styles'
import Navbar from '../../../../ui/Navbar/Navbar'
import { SectionColumn } from '../../../../ui/Section/Section'
import EditMenu from '../../EditMenu'

export const UpdateSecondCard = () => {
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
        `home_second_card/${id}`,
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
        Swal.fire('Correcto', `Se actualizo correctamente`, 'success').then(
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
        const resp = await fetchData(`home_second_card`, {
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
                id="second_homepage_card_img"
                type="text"
                name="homepage_card_img"
                value={homepage_card_img}
                label="Imagen:"
                placeholder={update.homepage_card_img}
                onChange={handleChange}
              />

              <Input
                id="second_homepage_card_title"
                type="text"
                name="homepage_card_title"
                value={homepage_card_title}
                label="Titulo"
                placeholder={update.homepage_card_title}
                onChange={handleChange}
              />

              <TextArea
                id="second_homepage_card_desc"
                type="textarea"
                name="homepage_card_desc"
                value={homepage_card_desc}
                label="Descripción:"
                rows="5"
                placeholder={update.homepage_card_desc}
                onChange={handleChange}
              />

              <Input
                id="second_homepage_card_button_text"
                type="text"
                name="homepage_card_button_text"
                value={homepage_card_button_text}
                label="Texto del boton:"
                placeholder={update.homepage_card_button_text}
                onChange={handleChange}
              />

              <Input
                id="second_homepage_card_button_color"
                type="text"
                name="homepage_card_button_color"
                value={homepage_card_button_color}
                label="Color del boton:"
                placeholder={update.homepage_card_button_color}
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
      <EditMenu />
      </div>
    </>
  )
}
