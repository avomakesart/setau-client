import React from 'react'
import Navbar from '../../ui/Navbar/Navbar'
import { SectionColumn } from '../../ui/Section/Section'
import EditMenu from './EditMenu'

export default function EditHome() {
  return (
    <>
      <Navbar />
      <SectionColumn>
        <h4>Pagina de edición / Inicio</h4>
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
        <EditMenu />
      </aside>
    </>
  )
}
