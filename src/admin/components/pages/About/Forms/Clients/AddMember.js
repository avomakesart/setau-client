import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { Button, DisabledButton } from '../../About.styles'
import Input from '../../../../ui/Input/Input'
import { InputContainer } from '../../../../ui/Input/Input.styles'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

export const AddClient = () => {
  const [client_image, setImage] = useState('')
  const [, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)

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
              type="file"
              name="file"
              label="Imagen"
              placeholder="Upload an image"
              onChange={uploadImage}
            />

            <Input
              id="client_image"
              type="text"
              name="client_image"
              value={client_image}
              onChange={() => setImage}
              style={{ display: 'none' }}
            />
          </InputContainer>
          {client_image ? (
            <Button onClick={handleSubmit} type="submit">
              Agregar Cliente
            </Button>
          ) : (
            <DisabledButton disabled>Agregar Cliente</DisabledButton>
          )}
        </div>
      ) : (
        <PrivateMessage />
      )}
    </>
  )
}
