import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../../../helpers/fetch'
import Hero from '../Hero/Hero'
import ProjectImage from './ProjectImage'
import {
  HomeWrapper,
  Section,
  FullColumnsContainer,
  FullColumn,
  MediumColumn,
  CardContentContainer,
} from './HomeScreen.styles'
import StreetMap from '../../../utils/StreetMap'
import Values from './sections/Values/Values'
import Card from '../Card/Card'
import Testimonials from './sections/Testimonials/Testimonials'
import Cta from './sections/Cta/Cta'
import Button from '../Button/Button'
import Navbar from '../Navbar/Navbar'

export default function HomeScreen() {
  const [homeCard, setHomeCard] = useState([])
  const [homeSecondCard, setHomeSecondCard] = useState([])
  const [homeThirdCard, setHomeThirdCard] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getCard = async () => {
      try {
        const resp = await fetchData('home_card', { signal: signal })
        const homeCardData = await resp.json()

        setHomeCard(homeCardData)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getSecondCard = async () => {
      try {
        const resp = await fetchData('home_second_card', { signal: signal })
        const homeSecondCard = await resp.json()

        setHomeSecondCard(homeSecondCard)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getThirdCard = async () => {
      try {
        const resp = await fetchData('home_third_card', { signal: signal })
        const homeThirdCard = await resp.json()

        setHomeThirdCard(homeThirdCard)
      } catch (error) {
        console.log(error.message)
      }
    }

    getThirdCard()
    getSecondCard()
    getCard()
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <HomeWrapper>
        <Section>
          <Values />
        </Section>

        <hr style={{ color: 'black', width: '50%' }} />

        <Section>
          <Card>
            {homeCard.map((card) => (
              <FullColumnsContainer key={card.id}>
                <MediumColumn>
                  <CardContentContainer>
                    <h4>{card.homepage_card_title}</h4>
                    <p>{card.homepage_card_desc}</p>
                    <Button
                      style={{
                        color: card.homepage_card_button_color,
                        backgroundColor:
                          card.homepage_card_button_background_color,
                      }}
                      onClick={() => window.location.href = '/nosotros'}
                      primary
                    >
                      {card.homepage_card_button_text}
                    </Button>
                  </CardContentContainer>
                </MediumColumn>
                <FullColumn>
                  <Link to="/nosotros">
                    <ProjectImage
                      url={card.homepage_card_img}
                      alt={card.homepage_card_title}
                    />
                  </Link>
                </FullColumn>
              </FullColumnsContainer>
            ))}
          </Card>
        </Section>

        <hr style={{ color: 'black', width: '50%' }} />

        <Section>
          <Card>
            {homeSecondCard.map((card) => (
              <FullColumnsContainer key={card.id}>
                <FullColumn>
                  <Link to="/nosotros">
                    <ProjectImage
                      url={card.homepage_card_img}
                      alt={card.homepage_card_title}
                    />
                  </Link>
                </FullColumn>
                <MediumColumn>
                  <CardContentContainer>
                    <h4>{card.homepage_card_title}</h4>
                    <p>{card.homepage_card_desc}</p>
                    <div>
                      <Button
                        style={{
                          color: card.homepage_card_button_color,
                          backgroundColor:
                            card.homepage_card_button_background_color,
                        }}
                        onClick={() => window.location.href = '/nosotros'}
                        primary
                      >
                        {card.homepage_card_button_text}
                      </Button>
                    </div>
                  </CardContentContainer>
                </MediumColumn>
              </FullColumnsContainer>
            ))}
          </Card>
        </Section>

        <hr style={{ color: 'black', width: '50%' }} />

        <Section>
          <Testimonials />
        </Section>

        <hr style={{ color: 'black', width: '50%' }} />

        <Section>
          <Card>
            {homeThirdCard.map((card) => (
              <FullColumnsContainer key={card.id}>
                <MediumColumn>
                  <CardContentContainer>
                    <h4>{card.homepage_card_title}</h4>
                    <p>{card.homepage_card_desc}</p>
                    <div>
                      <Button
                        style={{
                          color: card.homepage_card_button_color,
                          backgroundColor:
                            card.homepage_card_button_background_color,
                        }}
                        onClick={() => window.location.href = '/contacto'}
                        primary
                      >
                        {card.homepage_card_button_text}
                      </Button>
                    </div>
                  </CardContentContainer>
                </MediumColumn>

                <FullColumn>
                  <StreetMap />
                </FullColumn>
              </FullColumnsContainer>
            ))}
          </Card>
        </Section>

        <Section>
          <Cta />
        </Section>
      </HomeWrapper>
    </>
  )
}
