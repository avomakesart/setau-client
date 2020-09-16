import React from 'react'
import { PrivateContainer, PrivateButton } from '../ui/AdminRoot/styles'

export const PrivateMessage = () => {
  return (
    <PrivateContainer>
      <h3>Ups! contenido restringido!</h3>
      <PrivateButton to="/">Regresar al Inicio</PrivateButton>
    </PrivateContainer>
  )
}
