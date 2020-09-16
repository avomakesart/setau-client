import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
`

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Result = styled.h4`
    color: blue;
    text-align: center;
    margin-top: 0;
`

const Image = styled.img`
  max-width: 100%;
  width: 50%;
  margin: 0 auto;
`

const Button = styled(Link)`
    background: #191919;
    color: #ffffff !important;
    padding: 2rem;
    text-align: center;
    max-width: 100%;
    width: 50%;
    margin: 0 auto;
`

export const NotFound = () => {
  const location = useLocation()
  return (
    <Container>
        <ResultContainer>
      <h3 className="center">No se encontro nada para:</h3>
      <Result>{location.pathname}</Result>
      </ResultContainer>
      <Image
        src="https://res.cloudinary.com/bluecatencode/image/upload/v1599540404/setau_images/A040Lxr_qipg2n.png"
        alt="Lost in space"
      />
      <Button to="/">Regresar al Inicio</Button>
    </Container>
  )
}
