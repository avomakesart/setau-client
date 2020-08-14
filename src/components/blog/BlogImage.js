import React from 'react'
import { ImageContainer } from './Blog.styles'

export default function BlogImage({ item, url, className }) {
  return <ImageContainer src={url} alt={item} className={className} />
}
