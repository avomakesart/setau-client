import React from 'react'
import Navbar from '../../ui/Navbar/Navbar'
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
  return (
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
  )
}
