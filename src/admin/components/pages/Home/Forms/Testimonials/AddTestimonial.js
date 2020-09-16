import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import Input from '../../../../ui/Input/Input'
import TextArea from '../../../../ui/TextArea/TextArea'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

import { Button, DisabledButton } from '../../Home.styles'
import { InputContainer } from '../../../../ui/Input/Input.styles'

export const AddTestimonial = () => {
  const [testimonials_img, setImage] = useState('')
  const [, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    testimonials_desc: '',
    testimonials_img: '',
    testimonials_name: '',
  })

  const { testimonials_desc, testimonials_name } = formValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `testimonials`,
        {
          testimonials_desc,
          testimonials_img,
          testimonials_name,
        },
        'POST'
      )
      const body = await resp.json()
      console.log(body)
      Swal.fire(
        'Correct',
        `El testimonial se a publicado correctamente`,
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
        <InputContainer>
          <TextArea
            id="testimonials_desc"
            type="textarea"
            name="testimonials_desc"
            value={testimonials_desc}
            rows="3"
            label="Descripción:"
            placeholder="Descripción de testimonial"
            onChange={handleChange}
          />

          <Input
            type="file"
            name="file"
            label="Imagen"
            placeholder="Upload an image"
            onChange={uploadImage}
          />

          <Input
            id="add_testimonials_img"
            type="text"
            name="testimonials_img"
            value={testimonials_img}
            onChange={handleChange}
            style={{ display: 'none' }}
          />

          <Input
            id="testimonials_name"
            type="text"
            name="testimonials_name"
            value={testimonials_name}
            label="Nombre:"
            placeholder="Nombre del cliente"
            onChange={handleChange}
          />

          {
            (testimonials_desc,
            testimonials_img,
            testimonials_name ? (
              <Button onClick={handleSubmit} type="submit">
                Agregar testimonial
              </Button>
            ) : (
              <DisabledButton disabled>Agregar testimonial</DisabledButton>
            ))
          }
        </InputContainer>
      ) : (
        <PrivateMessage />
      )}
    </>
  )
}
