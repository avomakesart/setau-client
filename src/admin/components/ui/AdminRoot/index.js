import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../../helpers/fetch'
import Navbar from '../Navbar/Navbar'
import authService from '../../../../services/auth-service'
import { PrivateMessage } from '../../hoc/PrivateMessage'

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
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)

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
      ) : (
        <PrivateMessage />
      )}
    </>
  )
}
