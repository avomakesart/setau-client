import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { CardBody, Button, DisabledButton } from '../../Home.styles'
import Input from '../../../../../../components/ui/Input/Input'
import TextArea from '../../../../../../components/ui/TextArea/TextArea'
import { useForm } from '../../../../../../hooks/useForm'


export default function UpdateIcons() {
  const [updateValues, setUpdateValues] = useState([])
  const [formValues, handleChange] = useForm({
    icon_image: '',
    icon_title: '',
    icon_description: '',
  })

  const { icon_image, icon_title, icon_description } = formValues

  const id = updateValues.map((value) => value.id)

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

  return (
    <>
      {updateValues.map((update) => (
        <CardBody key={update.id}>
          <Input
            type="text"
            name="icon_image"
            value={icon_image}
            label="Imagen"
            placeholder={update.icon_image}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="icon_title"
            value={icon_title}
            label="Subtitulo:"
            placeholder={update.icon_title}
            onChange={handleChange}
          />

          <TextArea
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
                Actulizar Icono
              </Button>
            ) : (
              <DisabledButton disabled>Actulizar Icono</DisabledButton>
            ))
          }
        </CardBody>
      ))}
    </>
  )
}
