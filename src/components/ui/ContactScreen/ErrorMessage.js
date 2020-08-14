import React from 'react'

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case 'required':
        return <p>Este campo es requerido</p>
      case 'minLength':
        return <p>Tu apellido debe tener al menos dos caracteres</p>
      case 'pattern':
        return <p>Ingresa un email valido</p>
      case 'min':
        return <p>El asunto debe tener al menos tres caracteres</p>
      case 'minL':
        return <p>El mensaje debe tener minimom 30 caracteres</p>
      default:
        return null
    }
  }

  return null
}
