import React from 'react'
import Navbar from '../../ui/Navbar/Navbar'
import { SectionColumn } from '../../ui/Section/Section'
import { Sidebar } from '../../../../components/ui/Sidebar/Sidebar'
import { NavLink } from './Home.styles'

export default function EditHome() {
  return (
    <>
      <Navbar />
      <SectionColumn>
        <h4>Pagina de edición</h4>
        <p>
          Aqui podras editar las secciones de la pagina de inicio, en lado
          derecho tienes un sidebar con todos los links para edición.
          <span
            aria-label="hand"
            role="img"
            style={{ fontSize: '2rem', marginLeft: '1rem' }}
          >
            &#x1F449;
          </span>
        </p>
      </SectionColumn>
      {/* <UpdateHero />
              <UpdateValuesSection />
              <UpdateIconValues />
              <UpdateCard />
              <UpdateSecondCard />
              <Testimonials /> */}

      <aside>
        <Sidebar>
          <NavLink to="/pages/home/edit-hero">Encabezado</NavLink>
          <NavLink to="/pages/home/edit-values">Seccion Valores</NavLink>
          <NavLink to="/pages/home/edit-values-icons">
            Iconos de valores
          </NavLink>
          <NavLink to="/pages/home/edit-card">Primer Tarjeta</NavLink>
          <NavLink to="/pages/home/edit-second-card">Segunda Tarjeta</NavLink>
          <NavLink to="/pages/home/testimonials">Testimoniales</NavLink>
          <NavLink to="/pages/home/edit-third-card">Tercer Tarjeta</NavLink>
          <NavLink to="/pages/home/edit-cta">CTA</NavLink>
        </Sidebar>
      </aside>
    </>
  )
}
