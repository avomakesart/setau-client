import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import Input from '../../../../ui/Input/Input'
import TitleInput from '../../../../ui/Input/TitleInput'
import { InputContainer, Label } from '../../../../ui/Input/Input.styles'
import TextArea from '../../../../ui/TextArea/TextArea'
import Navbar from '../../../../ui/Navbar/Navbar'
import EditMenu from '../../EditMenu'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

import {
  Button,
  DisabledButton,
  InputColorContainer,
  InputColor,
  Toggle,
  ToggleText,
  InputColorWrapper,
} from '../../Home.styles'

import {
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
} from '../../../BlogPost/BlogPost.styles'

export const UpdateCard = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [homepage_card_img, setImage] = useState('')
  const [, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    homepage_card_title: '',
    homepage_card_desc: '',
    homepage_card_button_text: '',
    homepage_card_button_color: '',
    homepage_card_button_background_color: '',
  })

  const {
    homepage_card_title,
    homepage_card_desc,
    homepage_card_button_text,
    homepage_card_button_color,
    homepage_card_button_background_color,
  } = formValues

  const id = updateValues.map((value) => value.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `home_card/${id}`,
        {
          homepage_card_title,
          homepage_card_desc,
          homepage_card_button_text,
          homepage_card_button_color,
          homepage_card_button_background_color,
          homepage_card_img,
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

    const getCardValues = async () => {
      try {
        const resp = await fetchData(`home_card`, {
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
                    <h4 className="center">Actualizar Primer Tarjeta</h4>
                    {updateValues.map((update) => (
                      <div key={update.id}>
                        <InputContainer>
                          <TitleInput
                            id="homepage_card_title"
                            type="text"
                            name="homepage_card_title"
                            value={homepage_card_title}
                            label="Titulo"
                            placeholder={update.homepage_card_title}
                            onChange={handleChange}
                          />

                          <TextArea
                            id="homepage_card_desc"
                            type="textarea"
                            name="homepage_card_desc"
                            value={homepage_card_desc}
                            label="Descripción:"
                            rows="3"
                            placeholder={update.homepage_card_desc}
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
                            id="homepage_card_img"
                            type="text"
                            name="homepage_card_img"
                            value={homepage_card_img}
                            placeholder={update.homepage_card_img}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                          />

                          <Input
                            id="homepage_card_button_text"
                            type="text"
                            name="homepage_card_button_text"
                            value={homepage_card_button_text}
                            label="Texto del boton:"
                            placeholder={update.homepage_card_button_text}
                            onChange={handleChange}
                          />

                          <InputColorWrapper>
                            <InputContainer>
                              <Label>Color de texto del botón</Label>
                              <InputColorContainer>
                                <InputColor
                                  id="homepage_card_button_color"
                                  type="color"
                                  name="homepage_card_button_color"
                                  value={homepage_card_button_color}
                                  placeholder={
                                    update.homepage_card_button_color
                                  }
                                  onChange={handleChange}
                                />
                              </InputColorContainer>
                            </InputContainer>

                            <InputContainer>
                              <Label>Color de fondo del botón</Label>
                              <InputColorContainer>
                                <InputColor
                                  id="homepage_card_button_background_color"
                                  type="color"
                                  name="homepage_card_button_background_color"
                                  value={homepage_card_button_background_color}
                                  placeholder={
                                    update.homepage_card_button_background_color
                                  }
                                  onChange={handleChange}
                                />
                              </InputColorContainer>
                            </InputContainer>
                          </InputColorWrapper>
                        </InputContainer>

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
