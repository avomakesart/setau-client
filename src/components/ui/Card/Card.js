import React from 'react'

import {
  ServicesContainer,
  ProjectsListContainer,
  ProjectCard,
  ListContainer,
} from './Card.styles'

export default function Card({ children }) {
  return (
    <ServicesContainer>
      <ProjectsListContainer>
        <ProjectCard>
          <ListContainer>{children}</ListContainer>
        </ProjectCard>
      </ProjectsListContainer>
    </ServicesContainer>
  )
}
