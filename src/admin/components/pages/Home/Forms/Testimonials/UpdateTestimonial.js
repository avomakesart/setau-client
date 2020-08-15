import React, { useEffect, useState } from 'react'
import { useForm } from '../../../../../../hooks/useForm'
import { fetchData } from '../../../../../../helpers/fetch'
import Swal from 'sweetalert2'
import Input from '../../../../../../components/ui/Input/Input'
import TextArea from '../../../../../../components/ui/TextArea/TextArea'
import {
  Button,
  DisabledButton,
  Container,
  Row,
  ColumnRow,
  Card,
  CardBody,
  NavLink,
} from '../../Home.styles'
import { useParams, useHistory } from 'react-router-dom'
import Navbar from '../../../../ui/Navbar/Navbar'
import { SectionColumn } from '../../../../ui/Section/Section'
import { Sidebar } from '../../../../../../components/ui/Sidebar/Sidebar'

export const UpdateTestimonial = () => {
  const [updateValue, setUpdateValue] = useState([])
  const [formValues, handleChange] = useForm({
    testimonials_desc: '',
    testimonials_img: '',
    testimonials_name: '',
  })

  const { testimonials_desc, testimonials_img, testimonials_name } = formValues

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
        `testimonials/${id}`,
        {
          testimonials_desc,
          testimonials_img,
          testimonials_name,
        },
        'PUT'
      )

      const body = await resp.json()

      if (body) {
        setUpdateValue(true)
      }
    } catch (err) {
      setUpdateValue(false)
      Swal.fire('Algo salio mal :(', `${err.message}!`, 'error')
      console.log(err.message)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getTestimonialInfo = async () => {
      try {
        const resp = await fetchData(`testimonials/${id}`, { signal: signal })
        const testimonials = await resp.json()

        setUpdateValue(testimonials)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTestimonialInfo()
    return function cleanup() {
      abortController.abort()
    }
  }, [id])

  console.log(id)

  return (
    <>
      <Navbar />
      <SectionColumn>
        <Container>
          <Row>
            <ColumnRow>
              <Card>
                <CardBody>
                  {updateValue.map((update) => (
                    <div key={update.id}>
                      <TextArea
                        id="testimonials_desc"
                        type="textarea"
                        name="testimonials_desc"
                        value={testimonials_desc}
                        label="Descripción:"
                        rows="5"
                        placeholder={update.testimonials_desc}
                        onChange={handleChange}
                      />
                      <Input
                        id="testimonials_img"
                        type="text"
                        name="testimonials_img"
                        value={testimonials_img}
                        label="Imagen:"
                        placeholder={update.testimonials_img}
                        onChange={handleChange}
                      />
                      <Input
                        id="testimonials_name"
                        type="text"
                        name="testimonials_name"
                        value={testimonials_name}
                        label="Nombre:"
                        placeholder={update.testimonials_name}
                        onChange={handleChange}
                      />
                      {
                        (testimonials_desc,
                        testimonials_img,
                        testimonials_name ? (
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
        <Sidebar>
          <NavLink to="/pages/home/edit-hero">Encabezado</NavLink>
          <NavLink to="/pages/home/edit-values">Seccion Valores</NavLink>
          <NavLink to="/pages/home/edit-values-icons">
            Iconos de valores
          </NavLink>
          <NavLink to="/pages/home/edit-card">Primer Tarjeta</NavLink>
          <NavLink to="/pages/home/edit-second-card">Segunda Tarjeta</NavLink>
          <NavLink to="/pages/home/testimonials">Testimoniales</NavLink>
        </Sidebar>
      </div>
    </>
  )
}
