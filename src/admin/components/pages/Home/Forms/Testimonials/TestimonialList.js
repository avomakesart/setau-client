import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { CardBody, LinkButton, DangerButton } from '../../Home.styles'
import {
  Container,
  TestimonialWrapper,
  TestimonialContainer,
  AvatarContainer,
  AvatarImage,
  NameContainer,
  TestimonialName,
} from '../../../../../../components/ui/Home/sections/Testimonials/Testimonials.styles'

export const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getTestimonials = async () => {
      try {
        const resp = await fetchData('testimonials', { signal: signal })
        const testimonials = await resp.json()

        setTestimonials(testimonials)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTestimonials()
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Ya no podras revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'crimson',
      cancelButtonColor: 'black',
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Borrado!', 'El testimonial se a borrado.', 'success')
        fetchData(`testimonials/${id}`, 'DELETE')
        const filteredTestimonial = testimonials.filter(
          (testimonial) => testimonial.id !== id
        )
        setTestimonials(filteredTestimonial)
        console.log(filteredTestimonial)
        // window.location.reload(true)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Tu testimonial esta a salvo',
          icon: 'error',
          confirmButtonColor: 'black',
        })
      }
    })
  }

  return (
    <CardBody>
      <Container>
        <TestimonialWrapper>
          {testimonials.map((t) => (
            <TestimonialContainer key={t.id}>
              <p>{t.testimonials_desc}</p>
              <NameContainer>
                <AvatarContainer>
                  <AvatarImage
                    src={t.testimonials_img}
                    alt={t.testimonials_name}
                  />
                </AvatarContainer>
                <TestimonialName>{t.testimonials_name}</TestimonialName>
              </NameContainer>
              <LinkButton to={`/pages/edit-testimonial/${t.id}`}>
                Actualizar Testimonial
              </LinkButton>
              <DangerButton onClick={() => handleDelete(t.id)}>
                Eliminar Testimonial
              </DangerButton>
            </TestimonialContainer>
          ))}
        </TestimonialWrapper>
      </Container>
    </CardBody>
  )
}
