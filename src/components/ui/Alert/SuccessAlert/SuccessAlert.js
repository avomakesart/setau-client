import React from 'react'
import { AlertContainer } from './SuccessAlert.styles'

export default function SuccessAlert({ children }) {
  return (
    <AlertContainer className="animate__animated animate__fadeIn">
      {children}
    </AlertContainer>
  )
}
