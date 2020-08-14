import React from 'react'
import { AlertContainer } from '../WarningAlert/WarningAlert.styles'

export default function WarningAlert({ children }) {
  return (
    <AlertContainer className="animate__animated animate__fadeIn">
      {children}
    </AlertContainer>
  )
}
