import React from 'react'

import { AlertContainer } from './SecondaryAlert.styles'

export default function SecondaryAlert({ children }) {
  return (
    <AlertContainer className="animate__animated animate__fadeIn">
      {children}
    </AlertContainer>
  )
}
