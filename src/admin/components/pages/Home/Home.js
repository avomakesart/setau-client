import React, { useState, useEffect } from 'react'
import Navbar from '../../ui/Navbar/Navbar'
import authService from '../../../../services/auth-service'
import { PrivateMessage } from '../../hoc/PrivateMessage'

import {
  Section,
  Container,
  Row,
  ColumnRow,
  LinkButton,
  Card,
  CardBody,
  MessageContainer,
} from './Home.styles'

export default function Home() {
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)

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
        <h4 className="center">Escoge una opción</h4>  
          <Row>
            <ColumnRow>
              <Card>
                <CardBody style={{ margin: 0 }}>
                  <MessageContainer>
                    <LinkButton to="/pages/home/edit">
                      Editar Pagina de Inicio
                    </LinkButton>
                    <LinkButton to="/">Visitar Pagina de Inicio</LinkButton>
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
