import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from '../../../../../../hooks/useForm'
import { fetchData } from '../../../../../../helpers/fetch'
import Input from '../../../../../../components/ui/Input/Input'
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

export const UpdateClient = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [formValues, handleChange] = useForm({
    client_image: '',
  })

  const { client_image } = formValues

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
        `client/${id}`,
        {
          client_image,
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
    const getClientInfo = async () => {
      try {
        const resp = await fetchData(`client/${id}`, { signal: signal })
        const client = await resp.json()

        setUpdateValues(client)
      } catch (error) {
        console.log(error.message)
      }
    }
    getClientInfo()
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
                        id="client_image"
                        type="text"
                        name="client_image"
                        value={client_image}
                        label="Imagen:"
                        placeholder={update.client_image}
                        onChange={handleChange}
                      />

                      {client_image ? (
                        <Button onClick={handleUpdate} type="submit">
                          Actualizar Cliente
                        </Button>
                      ) : (
                        <DisabledButton disabled>
                          Actualizar Cliente
                        </DisabledButton>
                      )}
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
