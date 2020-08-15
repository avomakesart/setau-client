import React, { useState, useEffect } from 'react'
import { fetchData } from '../../../../../../helpers/fetch'
import TeamCard from '../../../../../../components/ui/AboutScreen/TeamCard/TeamCard'
import Navbar from '../../../../ui/Navbar/Navbar'
import AboutEditMenu from '../../AboutEditMenu'
import Swal from 'sweetalert2'
import { ModalComponent } from '../../../../../../components/ui/Modal/ModalComponent'
import { AddTeamMember } from './AddTeamMember'

import {
  HeadLineContainer,
  SubHeadline,
  Headline,
  TeamCardContainer,
  TeamImage,
  Separator,
} from './TeamMembers.styles'

import {
  Container,
  Row,
  LinkButton,
  Card,
  CardBody,
  ButtonContainer,
  DangerButton,
  Column,
  MidSection,
} from '../../About.styles'

const modalbuttonStyles = {
  color: '#fff',
  backgroundColor: '#467fcf',
  borderColor: '#467fcf',
  cursor: 'pointer',
  letterSpacing: '0.03em',
  fontSize: '0.8125rem',
  fontWeight: '600',
  minWidth: '2.375rem',
  textAlign: 'center',
  border: '1px solid transparent',
  padding: '0.7rem',
  borderRadius: '3px',
  transition:
    'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  width: 'auto',
}

export default function TeamMembers() {
  const [teamMembersSection, setTeamMembersSection] = useState([])
  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getTeamMembersSection = async () => {
      try {
        const resp = await fetchData('team_section', { signal: signal })
        const membersData = await resp.json()

        setTeamMembersSection(membersData)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getTeamMembers = async () => {
      try {
        const resp = await fetchData('team_member', { signal: signal })
        const membersData = await resp.json()

        setTeamMembers(membersData)
      } catch (error) {
        console.log(error.message)
      }
    }

    getTeamMembersSection()
    getTeamMembers()
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'crimson',
      cancelButtonColor: 'black',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Borrado!', 'El miembro del equipo se a borrado.', 'success')
        fetchData(`team_member/${id}`, {}, 'DELETE')
        const filteredTeamMember = teamMembers.filter((t) => t.id !== id)
        setTeamMembers(filteredTeamMember)
        window.location.reload(true)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'El miembro del equipo esta a salvo',
          icon: 'error',
          confirmButtonColor: 'black',
        })
      }
    })
  }

  return (
    <>
      <Navbar />
      <MidSection>
        <Container>
          <h4 className="center">Sección de Equipo</h4>
          <Row>
            <Column>
              <Card>
                <CardBody style={{ margin: 0 }}>
                  {teamMembersSection.map((ts) => (
                    <>
                      <HeadLineContainer key={ts.id}>
                        <SubHeadline>{ts.section_title}</SubHeadline>
                        <Headline>{ts.section_subtitle}</Headline>
                        <p>{ts.section_description}</p>
                      </HeadLineContainer>
                      <ButtonContainer>
                        <LinkButton
                          to={`/pages/nosotros/equipo/editar-seccion-${ts.id}`}
                        >
                          Editar Sección
                        </LinkButton>
                      </ButtonContainer>
                    </>
                  ))}
                </CardBody>
              </Card>

              <Separator />
              <h4 className="center">Nuevo Miembro de Equipo</h4>
              <Card>
                <CardBody>
                  <ModalComponent
                    buttonText="Agregar Miembro del Equipo"
                    style={modalbuttonStyles}
                  >
                    <AddTeamMember />
                  </ModalComponent>
                </CardBody>
              </Card>

              <Separator />

              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardBody style={{ margin: 0 }}>
                    <TeamCardContainer>
                      <TeamCard>
                        <TeamImage
                          src={member.member_image}
                          alt={member.member_name}
                        />
                      </TeamCard>
                      <h4>{member.member_name}</h4>
                      <span>{member.member_position}</span>
                      <p>{member.member_description}</p>
                    </TeamCardContainer>
                    <ButtonContainer>
                      <LinkButton
                        to={`/pages/nosotros/equipo/editar-miembro-${member.id}`}
                      >
                        Editar Miembro
                      </LinkButton>
                      <DangerButton
                        type="button"
                        onClick={() => handleDelete(member.id)}
                      >
                        Eliminar Miembro
                      </DangerButton>
                    </ButtonContainer>
                  </CardBody>
                </Card>
              ))}
            </Column>
          </Row>
        </Container>
      </MidSection>
      <div>
        <AboutEditMenu />
      </div>
    </>
  )
}
