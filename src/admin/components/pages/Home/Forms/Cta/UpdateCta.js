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

export const UpdateCta = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    cta_button_color: '#ffffff',
    cta_button_background_color: '#191919',
    cta_button_text: '',
    cta_subtitle: '',
    cta_title: '',
  })

  const {
    cta_button_color,
    cta_button_background_color,
    cta_button_text,
    cta_subtitle,
    cta_title,
  } = formValues

  const id = updateValues.map((value) => value.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `homepage_cta/${id}`,
        {
          cta_button_color,
          cta_button_background_color,
          cta_button_text,
          cta_subtitle,
          cta_title,
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
        const resp = await fetchData(`homepage_cta`, {
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
                          <TitleInput
                            id="cta_title"
                            type="text"
                            name="cta_title"
                            value={cta_title}
                            label="Titulo"
                            placeholder={update.cta_title}
                            onChange={handleChange}
                          />

                          <Input
                            id="cta_subtitle"
                            type="text"
                            name="cta_subtitle"
                            value={cta_subtitle}
                            label="Subtitulo"
                            placeholder={update.cta_subtitle}
                            onChange={handleChange}
                          />

                          <Input
                            id="cta_button_text"
                            type="text"
                            name="cta_button_text"
                            value={cta_button_text}
                            label="Texto del boton:"
                            placeholder={update.cta_button_text}
                            onChange={handleChange}
                          />

                          <InputColorWrapper>
                            <InputContainer>
                              <Label>Color de texto del botón</Label>
                              <InputColorContainer>
                                <InputColor
                                  id="cta_button_color"
                                  type="color"
                                  name="cta_button_color"
                                  value={cta_button_color}
                                  placeholder={update.cta_button_color}
                                  onChange={handleChange}
                                />
                              </InputColorContainer>
                            </InputContainer>

                            <InputContainer>
                              <Label>Color de fondo del botón</Label>
                              <InputColorContainer>
                                <InputColor
                                  id="cta_button_background_color"
                                  type="color"
                                  name="cta_button_background_color"
                                  value={cta_button_background_color}
                                  placeholder={
                                    update.cta_button_background_color
                                  }
                                  onChange={handleChange}
                                />
                              </InputColorContainer>
                            </InputContainer>
                          </InputColorWrapper>
                        </InputContainer>

                        {
                          (cta_button_color,
                          cta_button_background_color,
                          cta_button_text,
                          cta_subtitle,
                          cta_title ? (
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
