import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Form from 'react-validation/build/form'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'
import { useForm } from '../../../hooks/useForm'
import AuthService from '../../../services/auth-service'
import { fetchData } from '../../../helpers/fetch'

// Alerts
import SuccessAlert from '../../ui/Alert/SuccessAlert/SuccessAlert'

import {
  Section,
  Container,
  Row,
  Column,
  LogoContainer,
  Card,
  CardBody,
  FieldContainer,
  Label,
  FormInput,
  CardFooter,
  Button,
  DisabledButton,
  MessageContainer,
  StyledLink,
} from './Profile.styles'
import WarningAlert from '../Alert/WarningAlert/WarningAlert'
import DangerAlert from '../Alert/DangerAlert/DangerAlert'
import Navbar from '../Navbar/Navbar'

export default function EditProfile() {
  const currentUser = AuthService.getCurrentUser()
  const [userInfo, setUserInfo] = useState([])
  const form = useRef()
  const checkBtn = useRef()

  const history = useHistory()

  const [successful, setSuccessful] = useState(false)
  const [formLoginValues, handleLoginInputChange] = useForm({
    fullname: '',
    username: '',
    email: '',
    password: '',
  })

  const { fullname, username, email, password } = formLoginValues

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getUserInfo = async () => {
      try {
        const resp = await fetchData(`user_info/${currentUser.id}`, {
          signal: signal,
        })
        const user = await resp.json()

        setUserInfo(user)
      } catch (error) {
        console.log(error.message)
      }
    }

    getUserInfo()

    return function cleanup() {
      abortController.abort()
    }
  }, [currentUser.id])

  const required = (value) => {
    if (!value) {
      return <DangerAlert>Este campo es obligatorio</DangerAlert>
    }
  }

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return <WarningAlert>Este no es un email valido</WarningAlert>
    }
  }

  const vname = (value) => {
    if (value.length < 3 || value.length > 100) {
      return (
        <WarningAlert>
          Tu nombre debe de tener al menos <b>3</b> caracteres.
        </WarningAlert>
      )
    }
  }

  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <WarningAlert>
          El usuario debe de tener por lo menos 3 caracteres.
        </WarningAlert>
      )
    }
  }

  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <WarningAlert>
          Tu contraseña debe de tener de 6 a 40 caracteres.
        </WarningAlert>
      )
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `user_info/${currentUser.id}`,
        {
          fullname,
          username,
          email,
          password,
        },
        'PUT'
      )

      const body = await resp.json()

      if (body) {
        setSuccessful(true)
      }
    } catch (err) {
      setSuccessful(false)
      Swal.fire('Algo salio mal :(', `${err.message}!`, 'error')
      console.log(err.message)
    }
  }

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  const userName = userInfo.map((user) => user.fullname)
  const userNickName = userInfo.map((user) => user.username)
  const userEmail = userInfo.map((user) => user.email)

  return (
    <>
    <Navbar />
    <Section>
      <Container>
        <Row>
          <Column>
            {!successful && (
              <>
                <Card>
                  <CardBody>
                    <LogoContainer>
                      <h5>Editar Perfil</h5>
                    </LogoContainer>

                    <Form onSubmit={handleUpdate} ref={form}>
                      <FieldContainer>
                        <Label>Nombre completo *</Label>
                        <FormInput
                          autoComplete="off"
                          type="text"
                          name="fullname"
                          value={fullname}
                          placeholder={userName}
                          onChange={handleLoginInputChange}
                          validations={[required, vname]}
                        />
                      </FieldContainer>
                      <FieldContainer>
                        <Label>Usuario *</Label>
                        <FormInput
                          autoComplete="off"
                          type="text"
                          name="username"
                          placeholder={userNickName}
                          value={username}
                          onChange={handleLoginInputChange}
                          validations={[required, vusername]}
                        />
                      </FieldContainer>
                      <FieldContainer>
                        <Label>Email *</Label>
                        <FormInput
                          autoComplete="off"
                          type="email"
                          name="email"
                          value={email}
                          placeholder={userEmail}
                          onChange={handleLoginInputChange}
                          validations={[required, validEmail]}
                        />
                      </FieldContainer>
                      <FieldContainer>
                        <Label>Nueva contraseña *</Label>
                        <FormInput
                          autoComplete="off"
                          type="password"
                          name="password"
                          value={password}
                          placeholder="******"
                          onChange={handleLoginInputChange}
                          validations={[required, vpassword]}
                        />
                      </FieldContainer>
                      <CardFooter>
                        {
                          (fullname,
                          email,
                          username,
                          password ? (
                            <Button type="submit">Actualizar Perfil</Button>
                          ) : (
                            <DisabledButton type="submit" disabled>
                              Actualizar Perfil
                            </DisabledButton>
                          ))
                        }
                      </CardFooter>
                      <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                    </Form>

                    <CardFooter>
                      <Button onClick={handleReturn}>Regresar</Button>
                    </CardFooter>
                  </CardBody>
                </Card>
              </>
            )}
            <div>
              {successful && (
                <SuccessAlert>
                  <MessageContainer>
                    EL usuario se actualizo correctamente
                    <StyledLink to="/profile">Regresar a mi perfil</StyledLink>
                  </MessageContainer>
                </SuccessAlert>
              )}
            </div>
          </Column>
        </Row>
      </Container>
    </Section>
    </>
  )
}
