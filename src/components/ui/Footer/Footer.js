import React from 'react'
import styled from 'styled-components'

export const StyledFooter = styled.footer`
padding: 24px 16px;
    margin-top: auto;
  z-index: 10;
  background: black;
  color: white;
  height: 50px;
`

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  background: black;
  height: auto;
  padding: 1rem;
`

export default function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <span>© Setau {new Date().getFullYear()}</span>
      </FooterContainer>
    </StyledFooter>
  )
}
