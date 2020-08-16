import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../helpers/fetch'
import Navbar from '../../ui/Navbar/Navbar'
import { ImageContainer } from '../../../../components/blog/Blog.styles'
import {
  Section,
  Container,
  Row,
  Column,
  Card,
  CardBody,
  ValuesGrid,
  ValueCard,
  ButtonContainer,
  LinkButton,
  DangerButton,
} from './BlogPost.styles'

export default function BlogPost() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getPosts = async () => {
      try {
        const resp = await fetchData('blog_post', { signal: signal })
        const posts = await resp.json()

        setPosts(posts)
      } catch (error) {
        console.log(error.message)
      }
    }
    getPosts()
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
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Borrado!', `La entrada se a borrado.`, 'success')
        fetchData(`blog_post/${id}`, {}, 'DELETE')
        const filteredPosts = posts.filter((p) => p.id !== id)
        setPosts(filteredPosts)
        // window.location.reload(true)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: `La entrada del blog esta a salvo`,
          icon: 'error',
          confirmButtonColor: 'black',
        })
      }
    })
  }

  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <h4 className="center">Lista de entradas</h4>
          <Row>
            <Column>
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardBody style={{ margin: 0 }}>
                    <ValuesGrid>
                      <ValueCard>
                        <ImageContainer
                          src={post.featured_image}
                          alt="Featured Image"
                        />
                        <h4>{post.title}</h4>
                        <p className="left">
                          <b>Meta title:</b> {post.metatitle}
                        </p>
                        <p className="left">
                          <b>Slug: </b>
                          {post.slug}
                        </p>
                        <p>{post.summary}</p>
                      </ValueCard>
                      <ButtonContainer>
                        <LinkButton
                          to={`posts/entrada-${post.id}/${post.slug}`}
                        >
                          Ver Entrada
                        </LinkButton>
                        <LinkButton to={`/pages/edit-post/${post.id}`}>
                          Editar Entrada
                        </LinkButton>
                        <DangerButton
                          type="button"
                          onClick={() => handleDelete(post.id)}
                        >
                          Eliminar Entrada
                        </DangerButton>
                      </ButtonContainer>
                    </ValuesGrid>
                  </CardBody>
                </Card>
              ))}
            </Column>
          </Row>
        </Container>
      </Section>
    </>
  )
}
