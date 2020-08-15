import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from '../../../../../../hooks/useForm'
import { fetchData } from '../../../../../../helpers/fetch'
import Input from '../../../../../../components/ui/Input/Input'
import TextArea from '../../../../../../components/ui/TextArea/TextArea'
import { SectionColumn } from '../../../../ui/Section/Section'
import Navbar from '../../../../ui/Navbar/Navbar'
import AboutEditMenu from '../../AboutEditMenu'

import {
    Button,
    DisabledButton,
    Container,
    Row,
    ColumnRow,
    Card,
    CardBody,
  } from '../../About.styles'

export const UpdateMember = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [formValues, handleChange] = useForm({
    member_description: '',
    member_image: '',
    member_name: '',
    member_position: '',
  })

  const {
    member_description,
    member_image,
    member_name,
    member_position,
  } = formValues

  const { id } = useParams()
  const history = useHistory()

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `team_member/${id}`,
        {
          member_description,
          member_image,
          member_name,
          member_position,
        },
        'PUT'
      )

      const body = await resp.json()

      if (body) {
        setUpdateValues(true)
      }
    } catch (err) {
      setUpdateValues(false)
      Swal.fire('Algo salio mal :(', `${err.message}!`, 'error')
      console.log(err.message)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getTestimonialInfo = async () => {
      try {
        const resp = await fetchData(`team_member/${id}`, { signal: signal })
        const teamMembers = await resp.json()

        setUpdateValues(teamMembers)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTestimonialInfo()
    return function cleanup() {
      abortController.abort()
    }
  }, [id])

  return (
    <>
      <Navbar />
      <SectionColumn>
        <Container>
          <Row>
            <ColumnRow>
              <Card>
                <CardBody>
                  {updateValues.map((update) => (
                    <div key={update.id}>
                      <Input
                        id="member_name"
                        type="text"
                        name="member_name"
                        value={member_name}
                        label="Nombre:"
                        placeholder={update.member_name}
                        onChange={handleChange}
                      />

                      <Input
                        id="member_image"
                        type="text"
                        name="member_image"
                        value={member_image}
                        label="Imagen:"
                        placeholder={update.member_image}
                        onChange={handleChange}
                      />

                      <Input
                        id="member_position"
                        type="text"
                        name="member_position"
                        value={member_position}
                        label="Posicion:"
                        placeholder={update.member_position}
                        onChange={handleChange}
                      />

                      <TextArea
                        id="member_description"
                        type="textarea"
                        name="member_description"
                        value={member_description}
                        label="Descripción:"
                        rows="5"
                        placeholder={update.member_description}
                        onChange={handleChange}
                      />

                      {
                        (member_description,
                        member_image,
                        member_name,
                        member_position ? (
                          <Button onClick={handleUpdate} type="submit">
                            Actualizar testimonial
                          </Button>
                        ) : (
                          <DisabledButton disabled>
                            Actualizar testimonial
                          </DisabledButton>
                        ))
                      }
                      <br />
                      <Button onClick={handleReturn} typs="button">
                        Regresar
                      </Button>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </ColumnRow>
          </Row>
        </Container>
      </SectionColumn>
      <div>
        <AboutEditMenu />
      </div>
    </>
  )
}
