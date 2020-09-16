import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../helpers/fetch'

import Navbar from '../Navbar/Navbar'
import Input from '../Input/Input'
import TextArea from '../TextArea/TextArea'

import {
  DisabledButton,
  ErrorText,
  CardTitle,
  Button,
  CardFooter,
  CardBody,
  Card,
  Column,
  Row,
  Container,
  Section,
  HeroTitle,
} from './Contact.styles'

export default function ContactScreen() {
  const [userData, setData] = useState({
    name: '',
    lastname: '',
    email: '',
    subject: '',
    message: '',
    formErrors: {
      name: '',
      lastname: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const { name, lastname, email, subject, message, formErrors } = userData

  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )

  const formValid = ({ formErrors, ...rest }) => {
    let valid = true

    // validate form errors being empty
    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false)
    })

    // validate the form was filled out
    Object.values(rest).forEach((val) => {
      val === null && (valid = false)
    })

    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValid(userData)) {
      try {
        const resp = await fetchData(
          `contact_message`,
          {
            name,
            lastname,
            email,
            subject,
            message,
          },
          'POST'
        )
        const body = await resp.json()
        console.log(body)
        Swal.fire(
          'Todo Listo!',
          'El mensaje se envío correctamente',
          'success'
        ).then(
          setTimeout(() => {
            window.location.reload(true)
          }, 2000)
        )
      } catch (err) {
        console.log(err.message)
      }
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE')
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target

    switch (name) {
      case 'name':
        formErrors.name =
          value.length < 3 ? 'Minimo 3 caracteres son requeridos' : ''
        break
      case 'lastname':
        formErrors.lastname =
          value.length < 3 ? 'Minimo 3 caracteres son requeridos' : ''
        break
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'Correo electrónico invalido'
        break
      case 'subject':
        formErrors.subject =
          value.length < 6 ? 'Minimo 6 caracteres son requeridos' : ''
        break
      case 'message':
        formErrors.message =
          value.length < 20 ? 'Minimo 20 caracteres son requeridos' : ''
        break
      default:
        break
    }

    setData({ ...userData, formErrors, [name]: value })
  }

  return (
    <>
      <Navbar />
      <Section>
        <HeroTitle className="animate__animated animate__fadeIn">Contactanos</HeroTitle>
        <Container>
          <Row>
            <Column>
              <Card>
                <CardBody>
                  <CardTitle>Envianos un mensaje</CardTitle>

                  <form onSubmit={handleSubmit} noValidate>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      noValidate
                      label="Nombre:"
                    />
                    {formErrors.name.length > 0 && (
                      <ErrorText>{formErrors.name}</ErrorText>
                    )}
                    <Input
                      type="text"
                      name="lastname"
                      value={lastname}
                      onChange={handleChange}
                      noValidate
                      label="Apellido:"
                    />
                    {formErrors.lastname.length > 0 && (
                      <ErrorText>{formErrors.lastname}</ErrorText>
                    )}

                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      noValidate
                      label="Correo Electrónico:"
                    />
                    {formErrors.email.length > 0 && (
                      <ErrorText>{formErrors.email}</ErrorText>
                    )}
                    <Input
                      type="text"
                      name="subject"
                      value={subject}
                      onChange={handleChange}
                      noValidate
                      label="Asunto:"
                    />
                    {formErrors.subject.length > 0 && (
                      <ErrorText>{formErrors.subject}</ErrorText>
                    )}

                    <TextArea
                      type="textarea"
                      name="message"
                      value={message}
                      rows="5"
                      onChange={handleChange}
                      noValidate
                      label="Tu mensaje / consulta:"
                    />
                    {formErrors.message.length > 0 && (
                      <ErrorText>{formErrors.message}</ErrorText>
                    )}
                    <CardFooter>
                      {
                        (name,
                        lastname,
                        email,
                        subject,
                        message ? (
                          <Button type="submit">Enviar</Button>
                        ) : (
                          <DisabledButton disabled>Enviar</DisabledButton>
                        ))
                      }
                    </CardFooter>
                  </form>
                </CardBody>
              </Card>
            </Column>
          </Row>
        </Container>
      </Section>
    </>
  )
}
