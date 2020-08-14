import React from 'react'
import { AlertContainer } from './DangerAlert.styles'

export default function DangerAlert({ children }) {
  return (
    <AlertContainer className="animate__animated animate__fadeIn">
      {children}
    </AlertContainer>
  )
}
