import React from 'react'
import Navbar from '../../ui/Navbar/Navbar'
import { SectionColumn } from '../../ui/Section/Section'
import AboutEditMenu from './AboutEditMenu'

export default function EditAbout() {
  return (
    <>
      <Navbar />
      <SectionColumn>
        <h4>Pagina de edición / Nosotros</h4>
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

      <aside>
        <AboutEditMenu />
      </aside>
    </>
  )
}
