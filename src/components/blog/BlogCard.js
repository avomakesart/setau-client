import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { fetchData } from '../../helpers/fetch'
import BlogImage from './BlogImage'

import {
  BlogImageContainer,
  EntryDate,
  StyledLink,
  BlogTitle
} from './Blog.styles'

export default function BlogCard() {
  const [post, setPost] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getPosts = async () => {
      try {
        const resp = await fetchData('blog_post', { signal: signal })
        const postData = await resp.json()

        setPost(postData)
      } catch (error) {
        console.log(error.message)
      }
    }
    getPosts()
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <>
      {post.map((p) => (
        <BlogImageContainer key={p.id}>
          <StyledLink to={`/blog/${p.id}/${p.slug}`}>
            <BlogImage url={p.featured_image} alt="Avatar" />
          </StyledLink>
          <StyledLink to={`/blog/${p.id}/${p.slug}`}>
            <BlogTitle>{p.title}</BlogTitle>
          </StyledLink>
          <EntryDate>
            {moment(`${p.createdat}`).format('MMMM D, YYYY')}
          </EntryDate>
          <p>{p.summary}</p>
        </BlogImageContainer>
      ))}
    </>
  )
}
