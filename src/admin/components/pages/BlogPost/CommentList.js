import React from 'react'
import moment from 'moment'
import { Separator } from '../../../../components/blog/single-post/SinglePost.styles'

export const Comments = ({ comments, children }) => {
  return (
    <div>
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
          {children}
          <Separator />
        </div>
      ))}
    </div>
  )
}
