import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useForm } from '../../../../../../hooks/useForm'
import { fetchData } from '../../../../../../helpers/fetch'
import Navbar from '../../../../ui/Navbar/Navbar'
import EditMenu from '../../EditMenu'
import Input from '../../../../ui/Input/Input'
import TitleInput from '../../../../ui/Input/TitleInput'
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
import TextArea from '../../../../ui/TextArea/TextArea'
export const UpdateIcons = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [icon_image, setImage] = useState('')
  const [, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    icon_title: '',
    icon_description: '',
  })

  const { icon_title, icon_description } = formValues

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
        `icon_values/${id}`,
        {
          icon_image,
          icon_title,
          icon_description,
        },
        'PUT'
      )

      const body = await resp.json()

      if (body) {
        setUpdateValues(true)
      }
    } catch (err) {
      setUpdateValues(false)
      Swal.fire('Algo salio mal :(', `${err.message}!`, 'error')
      console.log(err.message)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getTestimonialInfo = async () => {
      try {
        const resp = await fetchData(`icon_values/${id}`, { signal: signal })
        const testimonials = await resp.json()

        setUpdateValues(testimonials)
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
                    {updateValues.map((update) => (
                      <div key={update.id}>
                        <InputContainer>
                          <Input
                            type="file"
                            name="file"
                            label="Imagen"
                            placeholder="Upload an image"
                            onChange={uploadImage}
                          />

                          <Input
                            id="icon_image"
                            type="text"
                            name="icon_image"
                            value={icon_image}
                            placeholder={update.icon_image}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                          />
                          <TitleInput
                            id="icon_title"
                            type="text"
                            name="icon_title"
                            value={icon_title}
                            label="Nombre:"
                            placeholder={update.icon_title}
                            onChange={handleChange}
                          />
                          <TextArea
                            id="icon_description"
                            type="textarea"
                            name="icon_description"
                            value={icon_description}
                            label="Descripción:"
                            rows="5"
                            placeholder={update.icon_description}
                            onChange={handleChange}
                          />
                        </InputContainer>
                        {
                          (icon_image,
                          icon_title,
                          icon_description ? (
                            <Button onClick={handleUpdate} type="submit">
                              Actualizar testimonial
                            </Button>
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
