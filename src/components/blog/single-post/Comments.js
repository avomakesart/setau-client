import React from 'react'
import moment from 'moment'
import { Separator } from './SinglePost.styles'

export const Comments = ({ comments }) => {
  return (
    <div>
      <h4>
        {comments.length > 0
          ? `${comments.length} Comentarios`
          : 'Aun no hay comentarios se el primero en comentar'}
      </h4>
      <Separator />
      {comments.map((comment) => (
        <div key={comment.id}>
          <h5>{comment.title}</h5>
          <p>{comment.comment}</p>
          <p>{comment.user_comment}</p>
          <p>{moment(`${comment.publishedat}`).fromNow()}</p>
          <Separator />
        </div>
      ))}
    </div>
  )
}
