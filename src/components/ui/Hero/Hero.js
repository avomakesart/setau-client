import React, { useState, useEffect } from 'react'
import 'animate.css'
import Button from '../Button/Button'
import { fetchData } from '../../../helpers/fetch'

import {
  HeroSection,
  HeroContainer,
  HeroContent,
  HeroSubtitle,
  HeroTitle,
  ButtonContainer,
} from './Hero.styles'

export default function Hero() {
  const [hero, setHero] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getHero = async () => {
      try {
        const resp = await fetchData('homepage_hero', { signal: signal })
        const homeData = await resp.json()

        setHero(homeData)
      } catch (error) {
        console.log(error.message)
      }
    }

    getHero()
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const image = hero.map((h) => h.hero_image);

  const heroImgStyles = {
   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`
  }

  return (
    <>
      {hero.map((heroInfo) => (
        <HeroSection key={heroInfo.id} style={heroImgStyles}>
          <HeroContainer>
            <HeroContent>
              <HeroSubtitle className="animate__animated animate__fadeIn">
                {heroInfo.hero_title}
              </HeroSubtitle>
              <HeroTitle className="animate__animated animate__fadeInUp .1s">
                {heroInfo.hero_subtitle}
              </HeroTitle>
              <ButtonContainer>
                <Button
                  style={{
                    color: heroInfo.hero_button_color,
                    backgroundColor: heroInfo.hero_button_background_color,
                  }}
                  m0Auto
                  className="animate__animated animate__fadeIn .2s"
                >
                  {heroInfo.hero_button_text}
                </Button>
              </ButtonContainer>
            </HeroContent>
          </HeroContainer>
        </HeroSection>
      ))}
    </>
  )
}
