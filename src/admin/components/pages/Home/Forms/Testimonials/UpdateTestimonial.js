import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useForm } from '../../../../../../hooks/useForm'
import { fetchData } from '../../../../../../helpers/fetch'
import Navbar from '../../../../ui/Navbar/Navbar'
import EditMenu from '../../EditMenu'
import Input from '../../../../ui/Input/Input'
import TextArea from '../../../../ui/TextArea/TextArea'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

import { InputContainer } from '../../../../ui/Input/Input.styles'
import { Button, DisabledButton, Toggle, ToggleText } from '../../Home.styles'

import {
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
} from '../../../BlogPost/BlogPost.styles'

export const UpdateTestimonial = () => {
  const [updateValue, setUpdateValue] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [testimonials_img, setImage] = useState('')
  const [, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    testimonials_desc: '',
    testimonials_name: '',
  })

  const { testimonials_desc, testimonials_name } = formValues

  const { id } = useParams()
  const history = useHistory()

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `testimonials/${id}`,
        {
          testimonials_desc,
          testimonials_img,
          testimonials_name,
        },
        'PUT'
      )

      const body = await resp.json()

      if (body) {
        setUpdateValue(true)
      }
    } catch (err) {
      setUpdateValue(false)
      Swal.fire('Algo salio mal :(', `${err.message}!`, 'error')
      console.log(err.message)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getTestimonialInfo = async () => {
      try {
        const resp = await fetchData(`testimonials/${id}`, { signal: signal })
        const testimonials = await resp.json()

        setUpdateValue(testimonials)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTestimonialInfo()
    return function cleanup() {
      abortController.abort()
    }
  }, [id])

  const toggleMenu = () => {
    return setOpenMenu(!openMenu)
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
        <>
          <Navbar />
          <FullSection>
            <Container>
              <Row>
                <Column>
                  <AddFormBody>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      {!openMenu ? (
                        <>
                          <Toggle id="toggle" onClick={toggleMenu}>
                            &#8801;
                          </Toggle>
                          <ToggleText onClick={toggleMenu}>Menu</ToggleText>
                        </>
                      ) : (
                        <>
                          <Toggle id="toggle" onClick={toggleMenu}>
                            x
                          </Toggle>
                          <ToggleText onClick={toggleMenu}>Cerrar</ToggleText>
                        </>
                      )}

                      {openMenu && <EditMenu />}
                    </div>
                    {updateValue.map((update) => (
                      <div key={update.id}>
                        <InputContainer>
                          <TextArea
                            id="testimonials_desc"
                            type="textarea"
                            name="testimonials_desc"
                            value={testimonials_desc}
                            label="Descripción:"
                            rows="5"
                            placeholder={update.testimonials_desc}
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
                            id="testimonials_img"
                            type="text"
                            name="testimonials_img"
                            value={testimonials_img}
                            placeholder={update.testimonials_img}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                          />

                          <Input
                            id="testimonials_name"
                            type="text"
                            name="testimonials_name"
                            value={testimonials_name}
                            label="Nombre:"
                            placeholder={update.testimonials_name}
                            onChange={handleChange}
                          />
                        </InputContainer>
                        {
                          (testimonials_desc,
                          testimonials_img,
                          testimonials_name ? (
                            <>
                              <Button onClick={handleUpdate} type="submit">
                                Actualizar testimonial
                              </Button>
                              <br />
                            </>
                          ) : (
                            <DisabledButton disabled>
                              Actualizar testimonial
                            </DisabledButton>
                          ))
                        }
                        <br />
                        <Button onClick={handleReturn} typs="button">
                          Regresar
                        </Button>
                      </div>
                    ))}
                  </AddFormBody>
                </Column>
              </Row>
            </Container>
          </FullSection>
        </>
      ) : (
        <PrivateMessage />
      )}
    </>
  )
}
