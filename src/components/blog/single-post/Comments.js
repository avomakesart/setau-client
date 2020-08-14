import React from 'react'
import moment from 'moment'
import { Separator } from './SinglePost.styles'

export const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h5>{comment.title}</h5>
          <p>{comment.comment}</p>
          <p>{moment(`${comment.publishedat}`).fromNow()}</p>
          <Separator />
        </div>
      ))}
    </div>
  )
}
