import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../../helpers/fetch'
import Navbar from '../Navbar/Navbar'
import {
  Section,
  Container,
  Row,
  ColumnRow,
  Card,
  CardBody,
  CardTitle,
  MessageContainer,
} from './styles'

export default function AdminRoot() {
  const [userInfo, setUserInfo] = useState([])
  const [contactMessage, setContactMessage] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getUserInfo = async () => {
      try {
        const resp = await fetchData(`user_info`, {
          signal: signal,
        })
        const user = await resp.json()

        setUserInfo(user)
      } catch (error) {
        console.log(error.message)
      }
    }

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

    getUserInfo()
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
            <ColumnRow>
              <Card>
                <CardBody>
                  <MessageContainer>
                    <CardTitle>Usuarios Registrados</CardTitle>
                    <h2>{userInfo.length}</h2>
                  </MessageContainer>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <MessageContainer>
                    <CardTitle>Mensajes Recibidos</CardTitle>
                    <h2>{contactMessage.length}</h2>
                  </MessageContainer>
                </CardBody>
              </Card>
            </ColumnRow>
          </Row>
        </Container>
      </Section>
    </>
  )
}
