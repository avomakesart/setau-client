import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { ModalComponent } from '../../../../../../components/ui/Modal/ModalComponent'
import Navbar from '../../../../ui/Navbar/Navbar'
import AboutEditMenu from '../../AboutEditMenu'
import { AddClient } from './AddMember'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

import {
  HeadLineContainer,
  SubHeadline,
  Headline,
  Separator,
} from '../TeamMembers/TeamMembers.styles'

import {
  LinkButton,
  Card,
  CardBody,
  ButtonContainer,
  DangerButton,
  ValuesGrid,
  ValueCard,
  IconImage,
  Toggle,
  ToggleText,
} from '../../About.styles'

import {
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
} from '../../../BlogPost/BlogPost.styles'

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
  const [openMenu, setOpenMenu] = useState(false)
  const [clients, setClients] = useState([])
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)

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
        fetchData(`client/${id}`, {}, 'DELETE')
        const filteredClient = clients.filter((c) => c.id !== id)
        setClients(filteredClient)
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

  const toggleMenu = () => {
    return setOpenMenu(!openMenu)
  }

  useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

  return (
    <>
      {showAdminBoard ? (
        <>
          <Navbar />
          <FullSection>
            <Container>
              <Row>
                <Column>
                  <AddFormBody>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      {!openMenu ? (
                        <>
                          <Toggle id="toggle" onClick={toggleMenu}>
                            &#8801;
                          </Toggle>
                          <ToggleText onClick={toggleMenu}>Menu</ToggleText>
                        </>
                      ) : (
                        <>
                          <Toggle id="toggle" onClick={toggleMenu}>
                            x
                          </Toggle>
                          <ToggleText onClick={toggleMenu}>Cerrar</ToggleText>
                        </>
                      )}

                      {openMenu && <AboutEditMenu />}
                    </div>
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
                              <ValuesGrid>
                                <ValueCard>
                                  <IconImage
                                    src={c.client_image}
                                    alt="Client Icon"
                                  />
                                </ValueCard>
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
                              </ValuesGrid>
                            </CardBody>
                          </Card>
                        ))}
                      </Column>
                    </Row>
                  </AddFormBody>
                </Column>
              </Row>
            </Container>
          </FullSection>
        </>
      ) : (
        <PrivateMessage />
      )}
    </>
  )
}
