import React, { useState, useEffect } from 'react'
import Navbar from '../../ui/Navbar/Navbar'
import BlogCard from './BlogCard'
import authService from '../../../../services/auth-service'
import { PrivateMessage } from '../../hoc/PrivateMessage'

import {
  Container,
  EntryContainer,
  EntryInfo,
  EntryCardContainer,
} from '../../../../components/blog/Blog.styles'


export default function BlogPost() {
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)

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
      <Container>
        <h2 className="animate__animated animate__fadeInLeft">
          Todos los posts
        </h2>
        <EntryContainer className="animate__animated animate__fadeIn">
          <EntryInfo>
            <EntryCardContainer>
              <BlogCard />
            </EntryCardContainer>
          </EntryInfo>
        </EntryContainer>
      </Container>
    </>
          ) : (
            <PrivateMessage />
          )}
        </>
  )
}
