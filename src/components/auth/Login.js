import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Form from 'react-validation/build/form'
import CheckButton from 'react-validation/build/button'
import { useForm } from '../../hooks/useForm'
import AuthService from '../../services/auth-service'
import Spinner from '../ui/Spinner/Spinner'

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
  StyledLink,
} from './Auth.styles'
import DangerAlert from '../ui/Alert/DangerAlert/DangerAlert'

export default function Login() {
  const form = useRef()
  const checkBtn = useRef()
  const [loading, setLoading] = useState(false)
  const [, setMessage] = useState('')
  const [formLoginValues, handleLoginInputChange] = useForm({
    username: '',
    password: '',
  })

  const history = useHistory()

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  const { username, password } = formLoginValues

  const required = (value) => {
    if (!value) {
      return <DangerAlert>Este campo es requerido</DangerAlert>
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()

    setMessage('')
    setLoading(true)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          history.push('/profile')
          window.location.reload()
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setLoading(false)
          setMessage(resMessage)
          Swal.fire('Algo salio mal', `${resMessage} :(`, 'error')
        }
      )
    } else {
      setLoading(false)
    }
  }

  return (
    <Section>
      <Container>
        <Row>
          <Column>
            <LogoContainer>
              <Logo
                src="https://res.cloudinary.com/bluecatencode/image/upload/v1597078258/Icons/Screen_Shot_2020-08-10_at_11.50.33_lwygo6.png"
                alt="Setau"
              />
            </LogoContainer>
            <Card>
              <CardBody>
                <CardTitle>Inicia sesión</CardTitle>
                {!loading ? (
                  <Form onSubmit={handleLogin} ref={form}>
                    <FieldContainer>
                      <Label>Usuario:</Label>
                      <FormInput
                        autoComplete="off"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleLoginInputChange}
                        validations={[required]}
                      />
                    </FieldContainer>
                    <FieldContainer>
                      <Label>Contraseña:</Label>
                      <FormInput
                        autoComplete="off"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleLoginInputChange}
                        validations={[required]}
                      />
                    </FieldContainer>
                    <CardFooter>
                      <Button type="submit" disabled={loading}>
                        Iniciar sesión
                      </Button>
                      <p>¿Aun no tienes una cuenta?,</p>
                      <p>
                        Crea una <StyledLink to="/register">aquí</StyledLink>
                      </p>
                    </CardFooter>
                    <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                  </Form>
                ) : (
                  <Spinner />
                )}
              </CardBody>
            </Card>
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
