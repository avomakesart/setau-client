import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'
import Navbar from '../../../../ui/Navbar/Navbar'
import Input from '../../../../ui/Input/Input'
import TitleInput from '../../../../ui/Input/TitleInput'
import { InputContainer, Label } from '../../../../ui/Input/Input.styles'
import TextArea from '../../../../ui/TextArea/TextArea'
import AboutEditMenu from '../../AboutEditMenu'

import {
  Button,
  DisabledButton,
  InputColorContainer,
  InputColor,
  Toggle,
  ToggleText,
  InputColorWrapper,
} from '../../About.styles'

import {
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
} from '../../../BlogPost/BlogPost.styles'

export const UpdateAboutCard = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [card_img, setImage] = useState('')
  const [, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    card_title: '',
    card_desc: '',
    card_button_text: '',
    card_button_color: '',
    card_button_background_color: '',
  })

  const {
    card_title,
    card_desc,
    card_button_text,
    card_button_color,
    card_button_background_color,
  } = formValues

  const toggleMenu = () => {
    return setOpenMenu(!openMenu)
  }

  const id = updateValues.map((value) => value.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `about_card/${id}`,
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
        const resp = await fetchData(`about_card`, {
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

  useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

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

                      {openMenu && <AboutEditMenu />}
                    </div>
                    <h4 className="center">Actualizar Primer Tarjeta</h4>
                    {updateValues.map((update) => (
                      <div key={update.id}>
                        <InputContainer>
                          <TitleInput
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
                            type="file"
                            name="file"
                            label="Imagen"
                            placeholder="Upload an image"
                            onChange={uploadImage}
                          />

                          <Input
                            id="card_img"
                            type="text"
                            name="card_img"
                            value={card_img}
                            placeholder={update.card_img}
                            onChange={handleChange}
                            style={{ display: 'none' }}
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

                          <InputColorWrapper>
                            <InputContainer>
                              <Label>Color de texto del botón</Label>
                              <InputColorContainer>
                                <InputColor
                                  id="card_button_color"
                                  type="color"
                                  name="card_button_color"
                                  value={card_button_color}
                                  placeholder={update.card_button_color}
                                  onChange={handleChange}
                                />
                              </InputColorContainer>
                            </InputContainer>

                            <InputContainer>
                              <Label>Color de fondo del botón</Label>
                              <InputColorContainer>
                                <InputColor
                                  id="card_button_background_color"
                                  type="color"
                                  name="card_button_background_color"
                                  value={card_button_background_color}
                                  placeholder={
                                    update.card_button_background_color
                                  }
                                  onChange={handleChange}
                                />
                              </InputColorContainer>
                            </InputContainer>
                          </InputColorWrapper>
                        </InputContainer>

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
                            <DisabledButton disabled>
                              Actulizar Tarjeta
                            </DisabledButton>
                          ))
                        }
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
