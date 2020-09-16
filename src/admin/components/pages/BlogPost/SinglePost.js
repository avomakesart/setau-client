import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import moment from 'moment'
import { fetchData } from '../../../../helpers/fetch'
import Navbar from '../../ui/Navbar/Navbar'
import authService from '../../../../services/auth-service'
import { PrivateMessage } from '../../hoc/PrivateMessage'

import {
  Container,
  FeaturedImage,
  DateContainer,
  ReadTime,
  SinglePostTitle,
  Separator,
  ReturnButton,
} from '../../../../components/blog/single-post/SinglePost.styles'
import { DangerButton } from './BlogPost.styles'

export default function SinglePostAdmin() {
  const { id } = useParams()
  const history = useHistory()

  const [singlePost, setSinglePost] = useState([])
  const [comments, setComments] = useState([])
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getSinglePost = async () => {
      try {
        const resp = await fetchData(`blog_post/${id}`, { signal: signal })
        const postData = await resp.json()

        setSinglePost(postData)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getComment = async () => {
      try {
        const resp = await fetchData(`blog_post/${id}/comments/${id}`, {
          signal: signal,
        })
        const commentData = await resp.json()
        setComments(commentData)
      } catch (error) {
        console.log(error.message)
      }
    }

    getComment()
    getSinglePost()

    return function cleanup() {
      abortController.abort()
    }
  }, [id])

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
        fetchData(`blog_post/${id}/comments/${id}`, {}, 'DELETE')
        const filteredComments = comments.filter((p) => p.id !== id)
        setComments(filteredComments)
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
        <div>
          <Navbar />

          {singlePost.map((sp) => (
            <Container key={sp.id}>
              <SinglePostTitle className="animate__animated animate__fadeIn">
                {sp.title}
              </SinglePostTitle>
              <DateContainer>
                <p>{moment(`${sp.createdat}`).format('LL')} -</p>
                <ReadTime>{sp.read_time} de lectura -</ReadTime>
                <p> por: {sp.author_name}</p>
              </DateContainer>
              <FeaturedImage src={sp.featured_image} alt={sp.title} />
              <div dangerouslySetInnerHTML={{ __html: sp.content }}></div>
              <p>{sp.post_category}</p>
              <ReturnButton onClick={handleReturn}>Regresar</ReturnButton>
              <Separator />
            </Container>
          ))}

          <Container>
            <h4>
              {comments.length > 0
                ? `${comments.length} Comentarios`
                : 'Aun no hay realizado comentarios'}
            </h4>
            {comments.map((comment) => (
              <div key={comment.id}>
                <h5>{comment.title}</h5>
                <p>{comment.comment}</p>
                <p>{moment(`${comment.publishedat}`).fromNow()}</p>
                <DangerButton
                  className="w-auto"
                  onClick={() => handleDelete(comment.id)}
                >
                  Eliminar Comentario
                </DangerButton>
                <Separator />
              </div>
            ))}
          </Container>
        </div>
      ) : (
        <PrivateMessage />
      )}
    </>
  )
}
