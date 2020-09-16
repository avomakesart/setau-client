import React, { useState, useEffect } from 'react'
import authService from '../../../../services/auth-service'
import Navbar from '../../ui/Navbar/Navbar'
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
} from './About.styles'

export default function About() {
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
                        <LinkButton to="/pages/nosotros/edit">
                          Editar Pagina de Nosotros
                        </LinkButton>
                        <LinkButton to="/nosotros">
                          Visitar Pagina de Nosotros
                        </LinkButton>
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
