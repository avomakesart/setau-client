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
} from './Home.styles'

export default function Home() {
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
  )
}
