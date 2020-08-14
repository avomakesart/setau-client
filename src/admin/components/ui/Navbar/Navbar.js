import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import AuthService from '../../../../services/auth-service'
import { fetchData } from '../../../../helpers/fetch'
import DropDown from './DropDown/DropDown'
import SecondDropDown from './SecondDropDown/SecondDropDown'

import {
  Container,
  Navigation,
  NavContainer,
  NavBrand,
  NavLinksContainer,
  NavItem,
  AvatarImage,
  AvatarContainer,
  Role,
  DropItem
} from './Navbar.styles'


export default function Navbar() {
  const [userInfo, setUserInfo] = useState([])

  const currentUser = AuthService.getCurrentUser()
  const history = useHistory()
  const location = useLocation()


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getUserInfo = async () => {
      try {
        const resp = await fetchData(`user_info/${currentUser.id}`, {
          signal: signal,
        })
        const user = await resp.json()

        setUserInfo(user)
      } catch (error) {
        console.log(error.message)
      }
    }

    getUserInfo()

    return function cleanup() {
      abortController.abort()
    }
  }, [currentUser.id])

  const isActive = (history, path) => {
    if (location.pathname === path) {
      return {
        borderBottom: '2px solid #191919',
        transition: '.6s ease',
        color: '#467fcf',
      }
    } else {
      return null
    }
  }

  const pageItems = [
    {
      id: 1,
      value: <DropItem to="/pages/home">Pagina Principal</DropItem>,
    },
    {
      id: 2,
      value: <DropItem to="/pages/about">Pagina de Nosotros</DropItem>,
    },
    {
      id: 3,
      value: <DropItem to="/pages/contact">Pagina de Contacto</DropItem>,
    },
  ];

  const blogItems = [
    {
      id: 1,
      value: <DropItem to="/pages/posts">Posts</DropItem>,
    },
    {
      id: 2,
      value: <DropItem to="/pages/add-post">Agregar Nuevo Post</DropItem>,
    },
  ];
  
  

  return (
    <>
      <Container>
        <Navigation>
          <NavContainer>
            <NavBrand to="/">Setau</NavBrand>
            <NavLinksContainer>
              <AvatarContainer>
                <AvatarImage
                  src="https://res.cloudinary.com/bluecatencode/image/upload/v1597132883/Icons/app-icon-set-login-icon-comments-avatar-icon-11553436380yill0nchdm_cz8ekj.png"
                  alt="Avatar"
                />
              </AvatarContainer>
              {userInfo.map((user) => (
                <div key={user.id}>
                  <NavItem
                    to="/admin-area"
                    style={isActive(history, '/admin-area')}
                    key={user.id}
                  >
                    {user.fullname}
                  </NavItem>
                  <Role>{(currentUser.roles = 'Administrador')}</Role>
                </div>
              ))}
            </NavLinksContainer>
          </NavContainer>
        </Navigation>
      </Container>
      <Container>
        <Navigation>
          <NavContainer>
            <NavLinksContainer>
              <NavItem
                to="/admin-area"
                style={isActive(history, '/admin-area')}
              >
                Inicio
              </NavItem>

              <DropDown title="Paginas"  items={pageItems} />

              <SecondDropDown title="Blog"  items={blogItems} />
           
            </NavLinksContainer>
          </NavContainer>
        </Navigation>
      </Container>
    </>
  )
}
