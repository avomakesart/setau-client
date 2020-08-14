import React from 'react'
import { AlertContainer } from './PrimaryAlert.styles'

export default function PrimaryAlert({ children }) {
  return (
    <AlertContainer className="animate__animated animate__fadeIn">
      {children}
    </AlertContainer>
  )
}
