import React from 'react'
import { Sidebar } from '../../../../components/ui/Sidebar/Sidebar'
import { NavLink } from './Home.styles'
import { useHistory, useLocation } from 'react-router-dom'

export default function EditMenu() {
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
        to="/pages/home/edit-hero"
        style={isActive(history, '/pages/home/edit-hero')}
      >
        Encabezado
      </NavLink>
      <NavLink
        to="/pages/home/edit-values"
        style={isActive(history, '/pages/home/edit-values')}
      >
        Seccion Valores
      </NavLink>
      <NavLink
        to="/pages/home/edit-values-icons"
        style={isActive(history, '/pages/home/edit-values-icons')}
      >
        Iconos de valores
      </NavLink>
      <NavLink
        to="/pages/home/edit-card"
        style={isActive(history, '/pages/home/edit-card')}
      >
        Primer Tarjeta
      </NavLink>
      <NavLink
        to="/pages/home/edit-second-card"
        style={isActive(history, '/pages/home/edit-second-card')}
      >
        Segunda Tarjeta
      </NavLink>
      <NavLink
        to="/pages/home/testimonials"
        style={isActive(history, '/pages/home/testimonials')}
      >
        Testimoniales
      </NavLink>
      <NavLink
        to="/pages/home/edit-third-card"
        style={isActive(history, '/pages/home/edit-third-card')}
      >
        Tercer Tarjeta
      </NavLink>
      <NavLink
        to="/pages/home/edit-cta"
        style={isActive(history, '/pages/home/edit-cta')}
      >
        CTA
      </NavLink>
    </Sidebar>
  )
}
