import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import Navbar from '../../../../ui/Navbar/Navbar'
import EditMenu from '../../EditMenu'
import Input from '../../../../ui/Input/Input'
import TitleInput from '../../../../ui/Input/TitleInput'
import { InputContainer } from '../../../../ui/Input/Input.styles'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

import { Button, DisabledButton, Toggle, ToggleText } from '../../Home.styles'

import {
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
} from '../../../BlogPost/BlogPost.styles'
import TextArea from '../../../../ui/TextArea/TextArea'

export const UpdateValuesSection = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    section_subtitle: '',
    section_title: '',
    section_description: '',
  })

  const { section_subtitle, section_title, section_description } = formValues

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getCompanyValues = async () => {
      try {
        const resp = await fetchData(`company_values`, {
          signal: signal,
        })
        const vals = await resp.json()
        setUpdateValues(vals)
      } catch (error) {
        console.log(error.message)
      }
    }

    getCompanyValues()

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const Id = updateValues.map((user) => user.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `company_values/${Id}`,
        {
          section_subtitle,
          section_title,
          section_description,
        },
        'PUT'
      )
      const body = await resp.json()
      if (body) {
        Swal.fire('Correct', `Se actualizo correctamente`, 'success').then(
          setTimeout(() => {
            window.location.reload(true)
          }, 2000)
        )
      }
    } catch (err) {
      console.log(err.message)
    }
  }

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
                        <h4>Seccion de valores</h4>
                        <InputContainer>
                          <TitleInput
                            id="section_title"
                            type="text"
                            name="section_title"
                            value={section_title}
                            label="Titulo"
                            placeholder={update.section_title}
                            onChange={handleChange}
                          />

                          <Input
                            id="section_subtitle"
                            type="text"
                            name="section_subtitle"
                            value={section_subtitle}
                            label="Subtitulo:"
                            placeholder={update.section_subtitle}
                            onChange={handleChange}
                          />

                          <TextArea
                            id="section_description"
                            type="textarea"
                            name="section_description"
                            value={section_description}
                            label="Descripción:"
                            rows="3"
                            placeholder={update.section_description}
                            onChange={handleChange}
                          />
                          {
                            (section_subtitle,
                            section_title,
                            section_description ? (
                              <Button onClick={handleUpdate} type="submit">
                                Actulizar Hero de Inicio
                              </Button>
                            ) : (
                              <DisabledButton disabled>
                                Actulizar Hero de Inicio
                              </DisabledButton>
                            ))
                          }
                        </InputContainer>
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
