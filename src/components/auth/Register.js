import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { isEmail } from 'validator'
import Form from 'react-validation/build/form'
import CheckButton from 'react-validation/build/button'
import { useForm } from '../../hooks/useForm'
import AuthService from '../../services/auth-service'

// Alerts
import DangerAlert from '../ui/Alert/DangerAlert/DangerAlert'
import WarningAlert from '../ui/Alert/WarningAlert/WarningAlert'
import SuccessAlert from '../ui/Alert/SuccessAlert/SuccessAlert'

import {
  Section,
  Container,
  Row,
  Column,
  LogoContainer,
  Logo,
  Card,
  CardBody,
  CardTitle,
  FieldContainer,
  Label,
  FormInput,
  CardFooter,
  Button,
  MessageContainer,
  StyledLink,
} from './Auth.styles'

export default function Register() {
  const form = useRef()
  const checkBtn = useRef()

  const history = useHistory()

  const [successful, setSuccessful] = useState(false)
  const [, setMessage] = useState('')
  const [formLoginValues, handleLoginInputChange] = useForm({
    fullname: '',
    username: '',
    email: '',
    password: '',
  })

  const { fullname, username, email, password } = formLoginValues

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

  const handleRegister = (e) => {
    e.preventDefault()

    setMessage('')
    setSuccessful(false)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(fullname, username, email, password).then(
        (response) => {
          setMessage(response.data.message)
          setSuccessful(true)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setMessage(resMessage)
          setSuccessful(false)
          Swal.fire('Algo salio mal', `👍🏻 ${resMessage}!`, 'error')
        }
      )
    }
  }

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  return (
    <Section>
      <Container>
        <Row>
          <Column>
            {!successful && (
              <>
                <LogoContainer>
                  <Logo
                    src="https://res.cloudinary.com/bluecatencode/image/upload/v1597078258/Icons/Screen_Shot_2020-08-10_at_11.50.33_lwygo6.png"
                    alt="Setau"
                  />
                </LogoContainer>

                <Card>
                  <CardBody>
                    <CardTitle>Crear una cuenta nueva</CardTitle>
                    <Form onSubmit={handleRegister} ref={form}>
                      <FieldContainer>
                        <Label>Nombre completo:</Label>
                        <FormInput
                          autoComplete="off"
                          type="text"
                          name="fullname"
                          value={fullname}
                          id="fullname"
                          onChange={handleLoginInputChange}
                          validations={[required, vname]}
                        />
                      </FieldContainer>
                      <FieldContainer>
                        <Label>Usuario:</Label>
                        <FormInput
                          type="text"
                          name="username"
                          autoComplete="off"
                          value={username}
                          onChange={handleLoginInputChange}
                          validations={[required, vusername]}
                        />
                      </FieldContainer>
                      <FieldContainer>
                        <Label>Email:</Label>
                        <FormInput
                          type="email"
                          name="email"
                          autoComplete="off"
                          value={email}
                          onChange={handleLoginInputChange}
                          validations={[required, validEmail]}
                        />
                      </FieldContainer>
                      <FieldContainer>
                        <Label>Contraseña:</Label>
                        <FormInput
                          type="password"
                          name="password"
                          autoComplete="off"
                          value={password}
                          onChange={handleLoginInputChange}
                          validations={[required, vpassword]}
                        />
                      </FieldContainer>
                      <CardFooter>
                        <Button type="submit">Crear Cuenta</Button>
                      </CardFooter>

                      <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                    </Form>
                  </CardBody>
                </Card>
              </>
            )}
            <div>
              {successful && (
                <SuccessAlert>
                  <MessageContainer>
                    EL usuario registro correctamente
                    <StyledLink to="/login">Inicia Sesión</StyledLink>
                  </MessageContainer>
                </SuccessAlert>
              )}
            </div>
            <Card>
              <CardBody>
                <Button onClick={handleReturn}>
                  Regresar a la pagina anterior
                </Button>
              </CardBody>
            </Card>
          </Column>
        </Row>
      </Container>
    </Section>
  )
}
