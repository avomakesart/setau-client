import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from '../../../../../../hooks/useForm'
import { fetchData } from '../../../../../../helpers/fetch'
import Navbar from '../../../../ui/Navbar/Navbar'
import Input from '../../../../ui/Input/Input'
import TitleInput from '../../../../ui/Input/TitleInput'
import { InputContainer } from '../../../../ui/Input/Input.styles'
import TextArea from '../../../../ui/TextArea/TextArea'
import AboutEditMenu from '../../AboutEditMenu'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

import { Button, DisabledButton, Toggle, ToggleText } from '../../About.styles'

import {
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
} from '../../../BlogPost/BlogPost.styles'

export const UpdateTeamSection = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    section_description: '',
    section_subtitle: '',
    section_title: '',
  })

  const { section_description, section_subtitle, section_title } = formValues

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
        `team_section/${id}`,
        {
          section_description,
          section_subtitle,
          section_title,
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
    const getTeamSection = async () => {
      try {
        const resp = await fetchData(`team_section/${id}`, { signal: signal })
        const teamMembers = await resp.json()

        setUpdateValues(teamMembers)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTeamSection()
    return function cleanup() {
      abortController.abort()
    }
  }, [id])

  useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

  const toggleMenu = () => {
    return setOpenMenu(!openMenu)
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
                    {updateValues.map((update) => (
                      <div key={update.id}>
                        <InputContainer>
                          <TitleInput
                            id="section_title"
                            type="text"
                            name="section_title"
                            value={section_title}
                            label="Titulo:"
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
                            rows="5"
                            placeholder={update.section_description}
                            onChange={handleChange}
                          />
                        </InputContainer>
                        {
                          (section_description,
                          section_subtitle,
                          section_title ? (
                            <Button onClick={handleUpdate} type="submit">
                              Actualizar Sección
                            </Button>
                          ) : (
                            <DisabledButton disabled>
                              Actualizar Sección
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
