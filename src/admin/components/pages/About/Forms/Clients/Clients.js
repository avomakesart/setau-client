import React, { useState, useEffect } from 'react'
import { fetchData } from '../../../../../../helpers/fetch'
import Navbar from '../../../../ui/Navbar/Navbar'
import AboutEditMenu from '../../AboutEditMenu'
import Swal from 'sweetalert2'
import { ModalComponent } from '../../../../../../components/ui/Modal/ModalComponent'

import { AvatarContainer, AvatarImage } from '../TeamMembers/TeamMembers.styles'
import { AddClient } from './AddMember'

import {
  HeadLineContainer,
  SubHeadline,
  Headline,
  Separator,
} from '../TeamMembers/TeamMembers.styles'

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

export default function Clients() {
  const [clientSection, setClientSection] = useState([])
  const [clients, setClients] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getClientSection = async () => {
      try {
        const resp = await fetchData('client_section', { signal: signal })
        const client = await resp.json()

        setClientSection(client)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getClients = async () => {
      try {
        const resp = await fetchData('client', { signal: signal })
        const client = await resp.json()

        setClients(client)
      } catch (error) {
        console.log(error.message)
      }
    }

    getClientSection()
    getClients()
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
        Swal.fire('Borrado!', 'El cliente se a borrado.', 'success')
        fetchData(`team_member/${id}`, {}, 'DELETE')
        const filteredClient = clients.filter((c) => c.id !== id)
        setClientSection(filteredClient)
        window.location.reload(true)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'El cliente esta a salvo',
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
                  {clientSection.map((ts) => (
                    <div key={ts.id}>
                      <HeadLineContainer>
                        <SubHeadline>{ts.section_title}</SubHeadline>
                        <Headline>{ts.section_subtitle}</Headline>
                        <p>{ts.section_description}</p>
                      </HeadLineContainer>
                      <ButtonContainer>
                        <LinkButton
                          to={`/pages/nosotros/clientes/editar-seccion-${ts.id}`}
                        >
                          Editar Sección
                        </LinkButton>
                      </ButtonContainer>
                    </div>
                  ))}
                </CardBody>
              </Card>

              <Separator />
              <h4 className="center">Nuevo Cliente</h4>
              <Card>
                <CardBody>
                  <ModalComponent
                    buttonText="Agregar Cliente"
                    style={modalbuttonStyles}
                  >
                    <AddClient />
                  </ModalComponent>
                </CardBody>
              </Card>

              <Separator />

              {clients.map((c) => (
                <Card key={c.id}>
                  <CardBody style={{ margin: 0 }}>
                    <AvatarContainer>
                      <AvatarImage src={c.client_image} alt="Client" />
                    </AvatarContainer>

                    <ButtonContainer>
                      <LinkButton
                        to={`/pages/nosotros/clientes/editar-cliente-${c.id}`}
                      >
                        Editar Cliente
                      </LinkButton>
                      <DangerButton
                        type="button"
                        onClick={() => handleDelete(c.id)}
                      >
                        Eliminar Cliente
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
