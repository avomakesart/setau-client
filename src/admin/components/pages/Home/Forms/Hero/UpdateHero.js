import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import Navbar from '../../../../ui/Navbar/Navbar'
import EditMenu from '../../EditMenu'
import Input from '../../../../ui/Input/Input'
import TitleInput from '../../../../ui/Input/TitleInput'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

import { InputContainer, Label } from '../../../../ui/Input/Input.styles'

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

export const UpdateHero = () => {
  const [updateHero, setUpdateHero] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [hero_image, setImage] = useState('')
  const [, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    hero_title: '',
    hero_subtitle: '',
    hero_button_text: '',
    hero_button_color: '#ffffff',
    hero_button_background_color: '#191919',
  })

  const {
    hero_title,
    hero_subtitle,
    hero_button_text,
    hero_button_color,
    hero_button_background_color,
  } = formValues

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getHeroInfo = async () => {
      try {
        const resp = await fetchData(`homepage_hero`, {
          signal: signal,
        })
        const contact = await resp.json()
        console.log(contact)
        setUpdateHero(contact)
      } catch (error) {
        console.log(error.message)
      }
    }

    getHeroInfo()
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const Id = updateHero.map((user) => user.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `homepage_hero/${Id}`,
        {
          hero_title,
          hero_subtitle,
          hero_image,
          hero_button_text,
          hero_button_color,
          hero_button_background_color,
        },
        'PUT'
      )
      const body = await resp.json()
      if (body) {
        Swal.fire(
          'Correct',
          `Se actualizo el hero de la pagina de inicio`,
          'success'
        )
      }
    } catch (err) {
      console.log(err.message)
    }
  }

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
                    {updateHero.map((update) => (
                      <div key={update.id}>
                        <h4>Encabezado de inicio</h4>

                        <InputContainer>
                          <TitleInput
                            id="hero_title"
                            type="text"
                            name="hero_title"
                            value={hero_title}
                            label="Titulo:"
                            placeholder={update.hero_title}
                            onChange={handleChange}
                          />

                          <Input
                            id="hero_subtitle"
                            type="text"
                            name="hero_subtitle"
                            value={hero_subtitle}
                            label="Subtitulo"
                            placeholder={update.hero_subtitle}
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
                            id="hero_image"
                            type="text"
                            name="hero_image"
                            value={hero_image}
                            placeholder={update.hero_image}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                          />

                          <Input
                            id="hero_button_text"
                            type="text"
                            name="hero_button_text"
                            value={hero_button_text}
                            label="Texto del boton"
                            placeholder={update.hero_button_text}
                            onChange={handleChange}
                          />

                          <InputColorWrapper>
                            <InputContainer>
                              <Label>Color de texto del botón</Label>
                              <InputColorContainer>
                                <InputColor
                                  id="hero_button_color"
                                  type="color"
                                  name="hero_button_color"
                                  value={hero_button_color}
                                  onChange={handleChange}
                                />
                              </InputColorContainer>
                            </InputContainer>

                            <InputContainer>
                              <Label>Color de fondo del botón</Label>
                              <InputColorContainer>
                                <InputColor
                                  id="hero_button_background_color"
                                  type="color"
                                  name="hero_button_background_color"
                                  value={hero_button_background_color}
                                  onChange={handleChange}
                                />
                              </InputColorContainer>
                            </InputContainer>
                          </InputColorWrapper>
                        </InputContainer>
                      </div>
                    ))}
                    {
                      (hero_title,
                      hero_subtitle,
                      hero_image,
                      hero_button_text,
                      hero_button_color,
                      hero_button_background_color ? (
                        <Button onClick={handleUpdate} type="submit">
                          Actulizar Encabezado de Inicio
                        </Button>
                      ) : (
                        <DisabledButton disabled>
                          Actulizar Encabezado de Inicio
                        </DisabledButton>
                      ))
                    }
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
