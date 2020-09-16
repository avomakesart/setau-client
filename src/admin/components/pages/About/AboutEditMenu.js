import React from 'react'
import { Sidebar } from '../../../../components/ui/Sidebar/Sidebar'
import { NavLink } from './About.styles'
import { useHistory, useLocation } from 'react-router-dom'

export default function AboutEditMenu() {
  const history = useHistory()
  const location = useLocation()

  const isActive = (history, path) => {
    if (location.pathname === path) {
      return {
        borderLeft: '2px solid #467fcf',
        transition: '.6s ease',
        color: 'gray',
      }
    } else {
      return null
    }
  }


  return (
    <Sidebar>
      <NavLink
        to="/pages/nosotros/edit-card"
        style={isActive(history, '/pages/nosotros/edit-card')}
      >
        Primer Tarjeta
      </NavLink>

      <NavLink
        to="/pages/home/edit-values-icons"
        style={isActive(history, '/pages/home/edit-values-icons')}
      >
        Iconos de valores
      </NavLink>

      <NavLink
        to="/pages/nosotros/edit-second-card"
        style={isActive(history, '/pages/nosotros/edit-second-card')}
      >
        Segunda Tarjeta
      </NavLink>

      <NavLink
        to="/pages/nosotros/equipo"
        style={isActive(history, '/pages/nosotros/equipo')}
      >
        Miembros del equipo
      </NavLink>

      <NavLink
        to="/pages/nosotros/clientes"
        style={isActive(history, '/pages/nosotros/clientes')}
      >
        Clientes
      </NavLink>
    </Sidebar>
  )
}
