import React from 'react'
import { Section, Container, Row, Column, NavLink } from './Home.styles'
import Navbar from '../../ui/Navbar/Navbar'
import { Sidebar } from '../../../../components/ui/Sidebar/Sidebar'

export default function EditHome() {
  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <Row>
            <Column>
              <h4>Secciones de pagina de inicio</h4>
              {/* <UpdateHero />
              <UpdateValuesSection />
              <UpdateIconValues />
              <UpdateCard />
              <UpdateSecondCard />
              <Testimonials /> */}
              <Sidebar>
                <NavLink to="/pages/home/edit-hero">Encabezado</NavLink>
                <NavLink to="/pages/home/edit-values">Seccion Valores</NavLink>
                <NavLink to="/pages/home/edit-values-icons">
                  Iconos de valores
                </NavLink>
                <NavLink to="/pages/home/edit-card">Primer Tarjeta</NavLink>
                <NavLink to="/pages/home/edit-second-card">
                  Segunda Tarjeta
                </NavLink>
                <NavLink to="/pages/home/testimonials">Testimoniales</NavLink>
              </Sidebar>
            </Column>
          </Row>
        </Container>
      </Section>
    </>
  )
}
