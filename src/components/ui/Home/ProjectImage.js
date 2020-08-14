import React from 'react'
import { ImageContainer } from './HomeScreen.styles'

export default function ProjectImage({ item, url, className }) {
  return <ImageContainer src={url} alt={item} className={className} />
}
