import React from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import { Button, DisabledButton } from '../../About.styles'
import { Input } from '../../../../../../components/blog/single-post/SinglePost.styles'

export const AddClient = () => {
  const [formValues, handleChange] = useForm({
    client_image: '',
  })

  const { client_image } = formValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `client`,
        {
          client_image,
        },
        'POST'
      )
      const body = await resp.json()
      console.log(body)
      Swal.fire(
        'Correct',
        `El Cliente se a publicado correctamente`,
        'success'
      ).then(
        setTimeout(() => {
          window.location.reload(true)
        }, 2000)
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <Input
        id="client_image"
        type="text"
        name="client_image"
        value={client_image}
        label="Imagen:"
        placeholder="Url de foto del client"
        onChange={handleChange}
      />

      {client_image ? (
        <Button onClick={handleSubmit} type="submit">
          Agregar Cliente
        </Button>
      ) : (
        <DisabledButton disabled>Agregar Cliente</DisabledButton>
      )}
    </div>
  )
}
