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

export const UpdateClientSection = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [formValues, handleChange] = useForm({
    section_description: '',
    section_subtitle: '',
    section_title: '',
  })

  const { section_description, section_subtitle, section_title } = formValues

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
        `client_section/${id}`,
        {
          section_description,
          section_subtitle,
          section_title,
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
    const getClientSection = async () => {
      try {
        const resp = await fetchData(`client_section/${id}`, { signal: signal })
        const client = await resp.json()

        setUpdateValues(client)
      } catch (error) {
        console.log(error.message)
      }
    }
    getClientSection()
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
                        id="section_title"
                        type="text"
                        name="section_title"
                        value={section_title}
                        label="Titulo:"
                        placeholder={update.section_title}
                        onChange={handleChange}
                      />

                      <Input
                        id="section_subtitle"
                        type="text"
                        name="section_subtitle"
                        value={section_subtitle}
                        label="Subtitulo:"
                        placeholder={update.section_subtitle}
                        onChange={handleChange}
                      />

                      <TextArea
                        id="section_description"
                        type="textarea"
                        name="section_description"
                        value={section_description}
                        label="Descripción:"
                        rows="5"
                        placeholder={update.section_description}
                        onChange={handleChange}
                      />

                      {
                        (section_description,
                        section_subtitle,
                        section_title ? (
                          <Button onClick={handleUpdate} type="submit">
                            Actualizar Sección
                          </Button>
                        ) : (
                          <DisabledButton disabled>
                            Actualizar Sección
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
