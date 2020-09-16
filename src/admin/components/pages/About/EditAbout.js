import React, { useState, useEffect } from 'react'
import authService from '../../../../services/auth-service'
import Navbar from '../../ui/Navbar/Navbar'
import AboutEditMenu from './AboutEditMenu'
import { PrivateMessage } from '../../hoc/PrivateMessage'

import { Toggle, ToggleText } from './About.styles'

import {
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
} from '../../pages/BlogPost/BlogPost.styles'


export default function EditAbout() {
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = () => {
    return setOpenMenu(!openMenu)
  }

  useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

  return (
    <>
      {showAdminBoard ? (
        <>
          <Navbar />
          <FullSection>
            <Container>
              <Row>
                <Column>
                  <AddFormBody>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      {!openMenu ? (
                        <>
                          <Toggle id="toggle" onClick={toggleMenu}>
                            &#8801;
                          </Toggle>
                          <ToggleText onClick={toggleMenu}>Menu</ToggleText>
                        </>
                      ) : (
                        <>
                          <Toggle id="toggle" onClick={toggleMenu}>
                            x
                          </Toggle>
                          <ToggleText onClick={toggleMenu}>Cerrar</ToggleText>
                        </>
                      )}

                      {openMenu && <AboutEditMenu />}
                    </div>
                    <h4>Pagina de edición / Nosotros</h4>
                    <p>
                      Aqui podras editar las secciones de la pagina de inicio,
                      en lado derecho tienes un sidebar con todos los links para
                      edición.
                      <span
                        aria-label="hand"
                        role="img"
                        style={{ fontSize: '2rem', marginLeft: '1rem' }}
                      >
                        &#x1F449;
                      </span>
                    </p>
                  </AddFormBody>
                </Column>
              </Row>
            </Container>
          </FullSection>
        </>
      ) : (
        <PrivateMessage />
      )}
    </>
  )
}
