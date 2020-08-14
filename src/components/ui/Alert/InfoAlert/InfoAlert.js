import React from 'react'
import { AlertContainer } from './InfoAlert.styles'

export default function InfoAlert({ children }) {
  return (
    <AlertContainer className="animate__animated animate__fadeIn">
      {children}
    </AlertContainer>
  )
}
