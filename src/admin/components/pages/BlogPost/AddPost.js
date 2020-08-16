import React from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../helpers/fetch'
import { useForm } from '../../../../hooks/useForm'
import {
  Button,
  DisabledButton,
  Card,
  CardBody,
  Section,
  Container,
  Row,
  Column,
} from '../BlogPost/BlogPost.styles'
import Input from '../../../../components/ui/Input/Input'
import { TextArea } from '../../../../components/blog/single-post/SinglePost.styles'
import Navbar from '../../ui/Navbar/Navbar'

export const AddPost = () => {
  const [formValues, handleChange] = useForm({
    title: '',
    metatitle: '',
    slug: '',
    summary: '',
    content: '',
    read_time: '',
    featured_image: '',
  })

  const {
    title,
    metatitle,
    slug,
    summary,
    content,
    read_time,
    featured_image,
  } = formValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `blog_post`,
        {
          title,
          metatitle,
          slug,
          summary,
          content,
          read_time,
          featured_image,
        },
        'POST'
      )
      const body = await resp.json()
      console.log(body)
      Swal.fire(
        'Correct',
        `La entrada del blog se a publicado correctamente`,
        'success'
      ).then(
        setTimeout(() => {
          window.location.reload(true)
        }, 2000)
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <h4 className="center">Publica una nueva entrada del blog</h4>
          <Row>
            <Column>
              <Card>
                <CardBody>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    label="Titulo de la entrada:"
                    placeholder="Un titulo de entrada"
                    onChange={handleChange}
                  />

                  <Input
                    id="metatitle"
                    type="text"
                    name="metatitle"
                    value={metatitle}
                    label="Meta title:"
                    placeholder="Ejemplo: welcome, cool, cats"
                    onChange={handleChange}
                  />

                  <Input
                    id="slug"
                    type="text"
                    name="slug"
                    value={slug}
                    label="Slug:"
                    placeholder="Siempre debe estar en minusculas: cool_post"
                    onChange={handleChange}
                  />

                  <Input
                    id="summary"
                    type="text"
                    name="summary"
                    value={summary}
                    label="Descripción corta:"
                    placeholder="Una breve descripción"
                    onChange={handleChange}
                  />

                  <TextArea
                    id="content"
                    type="textarea"
                    name="content"
                    value={content}
                    label="Contenido:"
                    rows="6"
                    placeholder="El contenido que quieras publicar"
                    onChange={handleChange}
                  />

                  <Input
                    id="read_time"
                    type="text"
                    name="read_time"
                    value={read_time}
                    label="Tiempo de lectura:"
                    placeholder="Cuanto tiempo durara la lectura"
                    onChange={handleChange}
                  />

                  <Input
                    id="featured_image"
                    type="text"
                    name="featured_image"
                    value={featured_image}
                    label="Imagen de la entrada:"
                    placeholder="URL de la imagen"
                    onChange={handleChange}
                  />

                  {
                    (title,
                    metatitle,
                    slug,
                    summary,
                    content,
                    read_time,
                    featured_image ? (
                      <Button onClick={handleSubmit} type="submit">
                        Agregar Entrada
                      </Button>
                    ) : (
                      <DisabledButton disabled>Agregar Entrada</DisabledButton>
                    ))
                  }
                </CardBody>
              </Card>
            </Column>
          </Row>
        </Container>
      </Section>
    </>
  )
}
