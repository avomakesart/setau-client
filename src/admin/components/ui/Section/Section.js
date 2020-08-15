import React from 'react'
import { MidSection, Container, Row, Column } from '../../pages/Home/Home.styles'

export const SectionColumn = ({ children }) => {
  return (
    <MidSection>
      <Container>
        <Row>
          <Column>{children}</Column>
        </Row>
      </Container>
    </MidSection>
  )
}
