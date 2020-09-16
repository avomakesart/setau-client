import React, { useState, useEffect } from 'react'
import { fetchData } from '../../../../../../helpers/fetch'
import Navbar from '../../../../ui/Navbar/Navbar'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

import {
  Card,
  CardBody,
  LinkButton,
  ButtonContainer,
  DangerButton,
  ValuesGrid,
  ValueCard,
  IconImage,
  Toggle,
  ToggleText,
} from '../../Home.styles'
import Swal from 'sweetalert2'
import EditMenu from '../../EditMenu'

import {
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
} from '../../../BlogPost/BlogPost.styles'

export const UpdateIconValues = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getCompanyValues = async () => {
      try {
        const resp = await fetchData(`icon_values`, {
          signal: signal,
        })
        const vals = await resp.json()
        setUpdateValues(vals)
      } catch (error) {
        console.log(error.message)
      }
    }

    getCompanyValues()

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
        Swal.fire('Borrado!', 'El testimonial se a borrado.', 'success')
        fetchData(`icon_values/${id}`, {}, 'DELETE')
        const filteteredCustomerID = updateValues.filter((t) => t.id !== id)
        setUpdateValues(filteteredCustomerID)
        window.location.reload(true)
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

                      {openMenu && <EditMenu />}
                    </div>
                    {updateValues.map((uv) => (
                      <Card key={uv.id}>
                        <CardBody>
                          <ValuesGrid>
                            <ValueCard key={uv.id}>
                              <IconImage
                                src={uv.icon_image}
                                alt={uv.icon_title}
                              />
                              <h5>{uv.icon_title}</h5>
                              <p>{uv.icon_description}</p>
                            </ValueCard>
                            <ButtonContainer>
                              <LinkButton
                                to={`/pages/home/edit-values-icons/${uv.id}`}
                              >
                                Actualizar Icono
                              </LinkButton>
                              <br />
                              <DangerButton
                                type="button"
                                onClick={() => handleDelete(uv.id)}
                              >
                                Eliminar Icono
                              </DangerButton>
                            </ButtonContainer>
                          </ValuesGrid>
                        </CardBody>
                      </Card>
                    ))}
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
