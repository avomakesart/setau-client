import React, { useState, useEffect } from 'react'
import AuthService from '../../../services/auth-service'
import { fetchData } from '../../../helpers/fetch'

import {
  Section,
  Container,
  Row,
  Column,
  LogoContainer,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  StyledLink,
  WelcomTitle,
} from './Profile.styles'
import Navbar from '../Navbar/Navbar'

export default function Profile() {
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const currentUser = AuthService.getCurrentUser()

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
  }, [])

  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <Row>
            <Column>
              <CardTitle>
                <LogoContainer>
                  <WelcomTitle>Bienvenido</WelcomTitle>
                  {userInfo.map((user) => (
                    <p key={user.id}>{user.username}</p>
                  ))}
                </LogoContainer>
              </CardTitle>

              <Card>
                <CardBody>
                  <LogoContainer>
                    <h5>Tu información</h5>
                  </LogoContainer>
                  {userInfo.map((user) => (
                    <div key={user.id}>
                      <p>
                        <strong>Id de usuario:</strong> {user.id}
                      </p>

                      <p>
                        <strong>Tu Nombre:</strong> {user.fullname}
                      </p>

                      <p>
                        <strong>Tu usuario:</strong> {user.username}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                    </div>
                  ))}
                  <CardFooter>
                    <StyledLink to="/edit-profile">Editar Perfil</StyledLink>
                  </CardFooter>
                </CardBody>
              </Card>
            </Column>
          </Row>
        </Container>
      </Section>
    </>
  )
}
