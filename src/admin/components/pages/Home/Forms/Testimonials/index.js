import React from 'react'
import { TestimonialList } from './TestimonialList'
import { Card } from '../../Home.styles'
import { ModalComponent } from '../../../../../../components/ui/Modal/ModalComponent'
import { AddTestimonial } from './AddTestimonial'

const modalbuttonStyles = {
  color: '#fff',
  backgroundColor: '#467fcf',
  borderColor: '#467fcf',
  cursor: 'pointer',
  letterSpacing: '0.03em',
  fontSize: '0.8125rem',
  minWidth: '2.375rem',
  textAlign: 'center',
  border: '1px solid transparent',
  padding: '0.7rem',
  borderRadius: '3px',
  transition:
    'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  width: 'auto',
}

export default function Testimonials() {
  return (
    <Card>
      <TestimonialList />
      <ModalComponent
        buttonText="Agregar Testimonial"
        style={modalbuttonStyles}
      >
        <AddTestimonial />
      </ModalComponent>
    </Card>
  )
}
