import React, { useState, useEffect } from 'react'
import { fetchData } from '../../../../helpers/fetch'

import Navbar from '../../ui/Navbar/Navbar'
import {
  Section,
  Container,
  Row,
  Column,
  Card,
  CardBody,
  MessageContainer,
} from './Contact.styles'

export default function Contact() {
  const [contactMessage, setContactMessage] = useState([])

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

  return (
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
                  <MessageContainer >

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
                </CardBody>
              </Card>
                  ))}
                    <hr style={{ width: '80%', margin: '2rem auto' }} />
            </Column>
          </Row>
        </Container>
      </Section>
    </>
  )
}
