import React from 'react'
import { Section, Container, Row, Column } from '../../pages/Home/Home.styles'

export const SectionColumn = ({ children }) => {
  return (
    <Section>
      <Container>
        <Row>
          <Column>{children}</Column>
        </Row>
      </Container>
    </Section>
  )
}
