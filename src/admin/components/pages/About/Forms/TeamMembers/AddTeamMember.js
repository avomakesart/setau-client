import React from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import { Button, DisabledButton } from '../../About.styles'
import {
  TextArea,
  Input,
} from '../../../../../../components/blog/single-post/SinglePost.styles'

export const AddTeamMember = () => {
  const [formValues, handleChange] = useForm({
    member_description: '',
    member_image: '',
    member_name: '',
    member_position: '',
  })

  const {
    member_description,
    member_image,
    member_name,
    member_position,
  } = formValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `team_member`,
        {
          member_description,
          member_image,
          member_name,
          member_position,
        },
        'POST'
      )
      const body = await resp.json()
      console.log(body)
      Swal.fire(
        'Correct',
        `El Miembro del equipo se a publicado correctamente`,
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
        id="member_name"
        type="text"
        name="member_name"
        value={member_name}
        label="Nombre:"
        placeholder="Nombre del miembro"
        onChange={handleChange}
      />

      <Input
        id="member_image"
        type="text"
        name="member_image"
        value={member_image}
        label="Imagen:"
        placeholder="Url de foto del miembro"
        onChange={handleChange}
      />

      <Input
        id="member_position"
        type="text"
        name="member_position"
        value={member_position}
        label="Posicion:"
        placeholder="Posición del miembro"
        onChange={handleChange}
      />

      <TextArea
        id="member_description"
        type="textarea"
        name="member_description"
        value={member_description}
        label="Descripción:"
        rows="5"
        placeholder="Descripción del miembro del equipo"
        onChange={handleChange}
      />

      {
        (member_description,
        member_image,
        member_name,
        member_position ? (
          <Button onClick={handleSubmit} type="submit">
            Agregar Miembro del Equipo
          </Button>
        ) : (
          <DisabledButton disabled>Agregar Miembro del Equipo</DisabledButton>
        ))
      }
    </div>
  )
}
