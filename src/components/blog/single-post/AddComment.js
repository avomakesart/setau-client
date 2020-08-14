import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../../../helpers/fetch'
import {
  CommentDataContainer,
  CommentFormContainer,
  Input,
  TextArea,
  SubmitButton,
} from './SinglePost.styles'
import Swal from 'sweetalert2'

export const AddComment = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [commentText, setCommentText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `blog_post/${id}/comments`,
        {
          title,
          comment: commentText,
        },
        'POST'
      )
      const body = await resp.json()
      console.log(body)
      Swal.fire(
        'Correct',
        `Tu comentario ${title} se a publicado`,
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
    <CommentFormContainer>
      <CommentDataContainer>
        <h4>Deja tu comentario:</h4>
      </CommentDataContainer>
      <label>Titulo:</label>
      <Input
        id="title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Comentario:</label>
      <TextArea
        id="comment"
        name="commentText"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows="3"
      />
      <SubmitButton onClick={handleSubmit} type="submit">
        Publicar Comentario
      </SubmitButton>
    </CommentFormContainer>
  )
}
