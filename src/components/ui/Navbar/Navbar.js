import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import AuthService from '../../../services/auth-service'
import 'hamburgers/dist/hamburgers.css'

import {
  Container,
  Navigation,
  NavContainer,
  NavBrand,
  NavLinksContainer,
  NavItem,
  MobileLinkContainer,
  MobileNavContainer,
  MobileItem,
  MobileNavContent,
  MobileStyledButton,
} from './Navbar.styles'

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [openMenu, setOpenMenu] = useState(false)

  const hamburgerAnimation = () => {
    var forEach = function (t, o, r) {
      if ('[object Object]' === Object.prototype.toString.call(t))
        for (var c in t)
          Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t)
      else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t)
    }

    var hamburgers = document.querySelectorAll('.hamburger')
    if (hamburgers.length > 0) {
      forEach(hamburgers, function (hamburger) {
        hamburger.addEventListener(
          'click',
          function () {
            this.classList.toggle('is-active')
          },
          false
        )
      })
    }
  }

  const toggleMenu = () => {
    return setOpenMenu(!openMenu)
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
    }

    hamburgerAnimation()
  }, [])

  const logOut = () => {
    AuthService.logout()
  }

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
            {currentUser ? (
              <>
                <NavItem to="/profile" style={isActive(history, '/profile')}>
                  Mi Perfil
                </NavItem>
                <NavItem to="/login" onClick={logOut}>
                  Cerrar Sesión
                </NavItem>
              </>
            ) : null}
          </NavLinksContainer>
          <MobileLinkContainer>
            <MobileStyledButton
              className="hamburger hamburger--elastic"
              type="button"
              aria-label="Menu"
              aria-controls="navigation"
              onClick={toggleMenu}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
              <span className="hamburger-label label-menu">Menu</span>
            </MobileStyledButton>
          </MobileLinkContainer>
        </NavContainer>
        {openMenu && (
          <MobileNavContainer>
            <MobileNavContent>
              <MobileItem to="/">Inicio</MobileItem>
              <MobileItem to="/nosotros">Nosotros</MobileItem>
              <MobileItem to="/blog">Blog</MobileItem>
              <MobileItem to="/contacto">Contactanos</MobileItem>
              {currentUser ? (
              <>
                <MobileItem to="/profile">
                  Mi Perfil
                </MobileItem>
                <MobileItem to="/login">
                  Cerrar Sesión
                </MobileItem>
              </>
            ) : null}
            </MobileNavContent>
          </MobileNavContainer>
        )}
      </Navigation>
    </Container>
  )
}
