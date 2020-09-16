import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import { Button, DisabledButton } from '../../About.styles'
import Input from '../../../../ui/Input/Input'
import TextArea from '../../../../ui/TextArea/TextArea'
import { InputContainer } from '../../../../ui/Input/Input.styles'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

export const AddTeamMember = () => {
  const [member_image, setImage] = useState('')
  const [, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    member_description: '',
    member_name: '',
    member_position: '',
  })

  const { member_description, member_name, member_position } = formValues

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

  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'setau_assets')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/bluecatencode/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    console.log(file.secure_url)
    setLoading(false)
  }

  useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

  return (
    <>
    {showAdminBoard ? (
    <div>
      <InputContainer>
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
          type="file"
          name="file"
          label="Imagen:"
          placeholder="Upload an image"
          onChange={uploadImage}
        />

        <Input
          id="member_image"
          type="text"
          name="member_image"
          value={member_image}
          onChange={handleChange}
          style={{ display: 'none' }}
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
      </InputContainer>
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
    ) : (
      <PrivateMessage />
    )}
  </>
  )
}
