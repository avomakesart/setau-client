import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../helpers/fetch'
import Navbar from '../../ui/Navbar/Navbar'
import authService from '../../../../services/auth-service'
import { PrivateMessage } from '../../hoc/PrivateMessage'

import {
  Section,
  Container,
  Row,
  Column,
  Card,
  CardBody,
  MessageContainer,
} from './Contact.styles'
import { DangerButton } from '../About/About.styles'

export default function Contact() {
  const [contactMessage, setContactMessage] = useState([])
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getContactMessage = async () => {
      try {
        const resp = await fetchData(`contact_message`, {
          signal: signal,
        })
        const contact = await resp.json()

        setContactMessage(contact)
      } catch (error) {
        console.log(error.message)
      }
    }

    getContactMessage()

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'crimson',
      cancelButtonColor: 'black',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Borrado!', 'El mensaje se a borrado.', 'success')
        fetchData(`contact_message/${id}`, {}, 'DELETE')
        const filteredMessage = contactMessage.filter((c) => c.id !== id)
        setContactMessage(filteredMessage)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'El cliente esta a salvo',
          icon: 'error',
          confirmButtonColor: 'black',
        })
      }
    })
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
          <Section>
            <Container>
              <Row>
                <Column>
                  <h4>Mensajes Recibidios del Formulario</h4>

                  {contactMessage.map((contact) => (
                    <Card key={contact.id}>
                      <CardBody>
                        <MessageContainer>
                          <p>
                            <b>Nombre:</b> {contact.name}
                          </p>
                          <p>
                            <b>Apellido:</b> {contact.lastname}
                          </p>
                          <p>
                            <b>Email:</b> {contact.email}
                          </p>
                          <p>
                            <b>Subject:</b> {contact.subject}
                          </p>
                          <p>
                            <b>Message:</b> {contact.message}
                          </p>
                        </MessageContainer>
                        <DangerButton
                          type="button"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Eliminar Mensaje
                        </DangerButton>
                      </CardBody>
                    </Card>
                  ))}
                  <hr style={{ width: '80%', margin: '2rem auto' }} />
                </Column>
              </Row>
            </Container>
          </Section>
        </>
      ) : (
        <PrivateMessage />
      )}
    </>
  )
}
