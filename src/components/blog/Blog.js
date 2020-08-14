import React from 'react'
import BlogCard from './BlogCard'
import Navbar from '../ui/Navbar/Navbar'
import {
  Container,
  EntryContainer,
  EntryInfo,
  EntryCardContainer,
} from './Blog.styles'


export default function Blog() {
  return (
    <>
      <Navbar />
      <Container>
        <h2 className="animate__animated animate__fadeInLeft">
          Lo ultimo del blog
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
  )
}
