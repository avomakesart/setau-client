import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../helpers/fetch'
import { useForm } from '../../../../hooks/useForm'
import Input from '../../../../components/ui/Input/Input'
import { TextArea } from '../../../../components/blog/single-post/SinglePost.styles'
import Navbar from '../../ui/Navbar/Navbar'

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

export const EditPost = () => {
  const [updateValue, setUpdateValue] = useState([])
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
    const getPostInfo = async () => {
      try {
        const resp = await fetchData(`blog_post/${id}`, { signal: signal })
        const blogpost = await resp.json()

        setUpdateValue(blogpost)
      } catch (error) {
        console.log(error.message)
      }
    }
    getPostInfo()
    return function cleanup() {
      abortController.abort()
    }
  }, [id])

  console.log(id)

  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <h4 className="center">Publica una nueva entrada del blog</h4>
          <Row>
            <Column>
              <Card>
                {updateValue.map((post) => (
                  <CardBody key={post.id}>
                    <Input
                      id="title"
                      type="text"
                      name="title"
                      value={title}
                      label="Titulo de la entrada:"
                      placeholder={post.title}
                      onChange={handleChange}
                    />

                    <Input
                      id="metatitle"
                      type="text"
                      name="metatitle"
                      value={metatitle}
                      label="Meta title:"
                      placeholder={post.metatitle}
                      onChange={handleChange}
                    />

                    <Input
                      id="slug"
                      type="text"
                      name="slug"
                      value={slug}
                      label="Slug:"
                      placeholder={post.slug}
                      onChange={handleChange}
                    />

                    <Input
                      id="summary"
                      type="text"
                      name="summary"
                      value={summary}
                      label="Descripción corta:"
                      placeholder={post.summary}
                      onChange={handleChange}
                    />

                    <TextArea
                      id="content"
                      type="textarea"
                      name="content"
                      value={content}
                      label="Contenido:"
                      rows="6"
                      placeholder={post.content}
                      onChange={handleChange}
                    />

                    <Input
                      id="read_time"
                      type="text"
                      name="read_time"
                      value={read_time}
                      label="Tiempo de lectura:"
                      placeholder={post.read_time}
                      onChange={handleChange}
                    />

                    <Input
                      id="featured_image"
                      type="text"
                      name="featured_image"
                      value={featured_image}
                      label="Imagen de la entrada:"
                      placeholder={post.featured_image}
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
                        <Button onClick={handleUpdate} type="submit">
                          Actualizar Entrada
                        </Button>
                      ) : (
                        <DisabledButton disabled>
                          Actualizar Entrada
                        </DisabledButton>
                      ))
                    }
                  </CardBody>
                ))}
                          <Button onClick={handleReturn}>
              Regresar
          </Button>
              </Card>
            </Column>
          </Row>

        </Container>
      </Section>
    </>
  )
}
