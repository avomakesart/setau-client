import React, { useState, useEffect } from 'react'
import { fetchData } from '../../../../../helpers/fetch'

import {
  HeadLineContainer,
  SubHeadline,
  Container,
  Headline,
  TestimonialWrapper,
  TestimonialContainer,
  AvatarContainer,
  AvatarImage,
  NameContainer,
  TestimonialName,
} from './Testimonials.styles'

export default function Testimonials() {
  const [testimonialSection, setTestimonialSection] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getTestimonialSection = async () => {
      try {
        const resp = await fetchData('testimonial_section', { signal: signal })
        const testimonialData = await resp.json()

        setTestimonialSection(testimonialData)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getTestimonials = async () => {
      try {
        const resp = await fetchData('testimonials', { signal: signal })
        const testimonialData = await resp.json()

        setTestimonials(testimonialData)
      } catch (error) {
        console.log(error.message)
      }
    }

    getTestimonialSection()
    getTestimonials()
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <>
      {testimonialSection.map((ts) => (
        <HeadLineContainer key={ts.id}>
          <SubHeadline>{ts.testimonial_title}</SubHeadline>
          <Headline>{ts.testimonial_subtitle}</Headline>
        </HeadLineContainer>
      ))}

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
            </TestimonialContainer>
          ))}
        </TestimonialWrapper>
      </Container>
    </>
  )
}
