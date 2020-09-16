import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { fetchData } from '../../../../helpers/fetch'
import BlogImage from '../../../../components/blog/BlogImage'

import { ButtonContainer, LinkButton, DangerButton } from './BlogPost.styles'

import {
  BlogImageContainer,
  EntryDate,
  StyledLink,
  BlogTitle,
} from '../../../../components/blog/Blog.styles'

import Swal from 'sweetalert2'


export default function BlogCard() {
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
      {posts.map((p) => (
        <BlogImageContainer key={p.id}>
          <StyledLink to={`posts/entrada-${p.id}/${p.slug}`}>
            <BlogImage url={p.featured_image} alt={p.slug} />
          </StyledLink>
          <StyledLink to={`posts/entrada-${p.id}/${p.slug}`}>
            <BlogTitle>{p.title}</BlogTitle>
          </StyledLink>
          <p className="left">
            <b>Titulo meta:</b> {p.metatitle}
          </p>
          <p className="left">
            <b>Slug: </b>
            {p.slug}
          </p>
          <EntryDate>
           Creado el: {moment(`${p.createdat}`).format('MMMM D, YYYY')}
          </EntryDate>
          <p>{p.summary}</p>
          <ButtonContainer>
            <LinkButton to={`posts/entrada-${p.id}/${p.slug}`}>
              Ver Entrada
            </LinkButton>
            <LinkButton to={`/pages/edit-post/${p.id}`}>
              Editar Entrada
            </LinkButton>
            <DangerButton type="button" onClick={() => handleDelete(p.id)}>
              Eliminar Entrada
            </DangerButton>
          </ButtonContainer>
        </BlogImageContainer>
      ))}
    </>
  )
}
