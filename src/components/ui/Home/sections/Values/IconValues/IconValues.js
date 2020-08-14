import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../../../../helpers/fetch'
import { ValuesGrid, ValueCard, IconImage } from '../Values.styles'

export default function IconValues() {
  const [Icons, setIcons] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getIcons = async () => {
      try {
        const resp = await fetchData('icon_values', { signal: signal })
        const icon = await resp.json()

        setIcons(icon)
      } catch (error) {
        console.log(error.message)
      }
    }

    getIcons()
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <ValuesGrid>
      {Icons.map((icon) => (
        <ValueCard key={icon.id}>
          <IconImage src={icon.icon_image} alt={icon.icon_title} />
          <h5>{icon.icon_title}</h5>
          <p>{icon.icon_description}</p>
        </ValueCard>
      ))}
    </ValuesGrid>
  )
}
