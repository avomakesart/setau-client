import React, { useState, useEffect } from 'react'
import { fetchData } from '../../../../../helpers/fetch'
import Button from '../../../Button/Button'
import { Container } from './Cta.styles'

export default function Cta() {
  const [homeCta, setHomeCta] = useState([])

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const getHomepageCta = async () => {
      try {
        const resp = await fetchData('homepage_cta', { signal: signal })
        const ctaData = await resp.json()

        setHomeCta(ctaData)
      } catch (error) {
        console.log(error.message)
      }
    }
    getHomepageCta()
    return function cleanup() {
      abortController.abort();
    };
  }, [])

  return (
    <>
      {homeCta.map((cta) => (
        <Container key={cta.id}>
          <div>
            <h3>{cta.cta_title}</h3>
            <h4>{cta.cta_subtitle}</h4>
          </div>
          <div>
            <Button style={{ color:  cta.cta_button_color, backgroundColor: cta.cta_button_background_color }} >
              {cta.cta_button_text}
            </Button>
          </div>
        </Container>
      ))}
    </>
  )
}
