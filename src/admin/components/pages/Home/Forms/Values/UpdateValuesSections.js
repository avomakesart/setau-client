import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import {
  Card,
  CardBody,
  Button,
  DisabledButton,
} from '../../Home.styles'
import Input from '../../../../../../components/ui/Input/Input'
import TextArea from '../../../../../../components/ui/TextArea/TextArea'
import { useForm } from '../../../../../../hooks/useForm'
import { SectionColumn } from '../../../../ui/Section/Section'
import Navbar from '../../../../ui/Navbar/Navbar'
import EditMenu from '../../EditMenu'

export const UpdateValuesSection = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [formValues, handleChange] = useForm({
    section_subtitle: '',
    section_title: '',
    section_description: '',
  })

  const { section_subtitle, section_title, section_description } = formValues

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getCompanyValues = async () => {
      try {
        const resp = await fetchData(`company_values`, {
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

  const Id = updateValues.map((user) => user.id)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `company_values/${Id}`,
        {
          section_subtitle,
          section_title,
          section_description,
        },
        'PUT'
      )
      const body = await resp.json()
      if (body) {
        Swal.fire('Correct', `Se actualizo correctamente`, 'success').then(
          setTimeout(() => {
            window.location.reload(true)
          }, 2000)
        )
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <SectionColumn>
        <Card>
          {updateValues.map((update) => (
            <CardBody key={update.id}>
              <h4>Seccion de valores</h4>

              <Input
                id="section_title"
                type="text"
                name="section_title"
                value={section_title}
                label="Titulo"
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
                (section_subtitle,
                section_title,
                section_description ? (
                  <Button onClick={handleUpdate} type="submit">
                    Actulizar Hero de Inicio
                  </Button>
                ) : (
                  <DisabledButton disabled>
                    Actulizar Hero de Inicio
                  </DisabledButton>
                ))
              }
            </CardBody>
          ))}
        </Card>
      </SectionColumn>
      <div>
      <EditMenu />
      </div>
    </>
  )
}
