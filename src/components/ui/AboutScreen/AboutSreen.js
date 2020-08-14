import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../../../helpers/fetch'
import IconValues from '../Home/sections/Values/IconValues/IconValues'
import Hero from './Hero/Hero'
import Button from '../Button/Button'
import ProjectImage from '../Home/ProjectImage'
import TeamCard from './TeamCard/TeamCard'
import Card from '../Card/Card'

import {
  Section,
  Container,
  FullColumnsContainer,
  FullColumn,
  CardContentContainer,
  ValuesContainer,
  ValuesContent,
  ColumnsContainer,
  ValuesCardContainer,
  ValuesCard,
  ColoredSection,
  HeadLineContainer,
  SubHeadline,
  Headline,
  TeamContainer,
  TeamCardContainer,
  ClientsContainer,
  ClientCardContainer,
  TeamImage,
  Separator,
  AvatarImage,
  AvatarContainer,
  ClientGrid,
} from './About.styles'
import Navbar from '../Navbar/Navbar'

export default function About() {
  const [aboutCard, setAboutCard] = useState([])
  const [aboutSecondCard, setAboutSecondCard] = useState([])
  const [teamSection, setTeamSection] = useState([])
  const [teamMember, setTeamMember] = useState([])
  const [clientSection, setClientSection] = useState([])
  const [client, setClient] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getCard = async () => {
      try {
        const resp = await fetchData('about_card', { signal: signal })
        const aboutCard = await resp.json()

        setAboutCard(aboutCard)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getSecondCard = async () => {
      try {
        const resp = await fetchData('about_second_card', { signal: signal })
        const aboutSecondCard = await resp.json()

        setAboutSecondCard(aboutSecondCard)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getTeamSection = async () => {
      try {
        const resp = await fetchData('team_section', { signal: signal })
        const section = await resp.json()

        setTeamSection(section)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getTeamMember = async () => {
      try {
        const resp = await fetchData('team_member', { signal: signal })
        const member = await resp.json()

        setTeamMember(member)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getClientSection = async () => {
      try {
        const resp = await fetchData('client_section', { signal: signal })
        const clientSection = await resp.json()

        setClientSection(clientSection)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getClient = async () => {
      try {
        const resp = await fetchData('client', { signal: signal })
        const client = await resp.json()

        setClient(client)
      } catch (error) {
        console.log(error.message)
      }
    }

    getClientSection()
    getClient()
    getTeamSection()
    getTeamMember()
    getCard()
    getSecondCard()

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Section>
        {aboutCard.map((card) => (
          <FullColumnsContainer key={card.id}>
            <FullColumn>
              <CardContentContainer>
                <h4>{card.card_title}</h4>
                <p>{card.card_desc}</p>
                <Button
                  style={{
                    color: card.card_button_color,
                    backgroundColor: card.card_button_background_color,
                  }}
                  primary
                >
                  {card.card_button_text}
                </Button>
              </CardContentContainer>
            </FullColumn>
            <FullColumn>
              <Link to="/nosotros">
                <ProjectImage url={card.card_img} alt={card.card_title} />
              </Link>
            </FullColumn>
          </FullColumnsContainer>
        ))}
        <Container>
          <ValuesContainer>
            <ValuesContent>
              <ValuesCardContainer>
                <ValuesCard>
                  <ColumnsContainer>
                    <IconValues />
                  </ColumnsContainer>
                </ValuesCard>
              </ValuesCardContainer>
            </ValuesContent>
          </ValuesContainer>
        </Container>

        <Separator />
        <ColoredSection>
          {aboutSecondCard.map((card) => (
            <FullColumnsContainer key={card.id}>
              <FullColumn>
                <Link to="/nosotros">
                  <ProjectImage url={card.card_img} alt={card.card_title} />
                </Link>
              </FullColumn>
              <FullColumn>
                <CardContentContainer>
                  <h4>{card.card_title}</h4>
                  <p>{card.card_desc}</p>
                  <Button
                    style={{
                      color: card.card_button_color,
                      backgroundColor: card.card_button_background_color,
                    }}
                    primary
                  >
                    {card.card_button_text}
                  </Button>
                </CardContentContainer>
              </FullColumn>
            </FullColumnsContainer>
          ))}
        </ColoredSection>
        <Separator />
        <TeamContainer>
          {teamSection.map((section) => (
            <HeadLineContainer key={section.id}>
              <SubHeadline>{section.section_title}</SubHeadline>
              <Headline>{section.section_subtitle}</Headline>
              <p>{section.section_description}</p>
            </HeadLineContainer>
          ))}
          {teamMember.map((member) => (
            <TeamCardContainer key={member.id}>
              <TeamCard>
                <TeamImage src={member.member_image} alt={member.member_name} />
              </TeamCard>
              <h4>{member.member_name}</h4>
              <span>{member.member_position}</span>
              <p>{member.member_description}</p>
            </TeamCardContainer>
          ))}
        </TeamContainer>
        <Separator />
        <ClientsContainer>
          <ClientCardContainer>
            {clientSection.map((section) => (
              <HeadLineContainer key={section.id}>
                <SubHeadline>{section.section_title}</SubHeadline>
                <Headline>{section.section_subtitle}</Headline>
                <p>{section.section_description}</p>
              </HeadLineContainer>
            ))}

            <Card>
              <ClientGrid>
                {client.map((c) => (
                  <AvatarContainer key={c.id}>
                    <AvatarImage src={c.client_image} alt="Client" />
                  </AvatarContainer>
                ))}
              </ClientGrid>
            </Card>
          </ClientCardContainer>
        </ClientsContainer>
      </Section>
    </>
  )
}
