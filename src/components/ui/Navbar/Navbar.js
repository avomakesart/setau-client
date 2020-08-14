import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  Container,
  Navigation,
  NavContainer,
  NavBrand,
  NavLinksContainer,
  NavItem,
} from './Navbar.styles'

export default function Navbar() {
 const history = useHistory()
 const location = useLocation()

  const isActive = (history, path) => {
    if (location.pathname === path) {
      return { borderBottom: '2px solid #191919', transition: '.6s ease' }
    } else {
      return null
    }
  }

  return (
    <Container>
      <Navigation>
        <NavContainer>
          <NavBrand to="/">Setau</NavBrand>
          <NavLinksContainer>
            <NavItem to="/" style={isActive(history, '/')}>
              Inicio
            </NavItem>
            <NavItem to="/nosotros" style={isActive(history, '/nosotros')}>
              Nosotros
            </NavItem>
            <NavItem to="/blog" style={isActive(history, '/blog')}>
              Blog
            </NavItem>
            <NavItem to="/contacto" style={isActive(history, '/contacto')}>
              Contactanos
            </NavItem>
          </NavLinksContainer>
        </NavContainer>
      </Navigation>
    </Container>
  )
}
