import React, { useState, useEffect } from 'react'
import { fetchData } from '../../../../../helpers/fetch'

import {
  HeadLineContainer,
  SubHeadline,
  Headline,
  ValuesContainer,
  ValuesContent,
  ColumnsContainer,
  ValuesCardContainer,
  ValuesCard,
} from './Values.styles'
import IconValues from './IconValues/IconValues'

export default function Values() {
  const [values, setValues] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getValues = async () => {
      try {
        const resp = await fetchData('company_values', { signal: signal })
        const icon = await resp.json()

        setValues(icon)
      } catch (error) {
        console.log(error.message)
      }
    }

    getValues()
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <>
      {values.map((vals) => (
        <HeadLineContainer key={vals.id}>
          <SubHeadline>{vals.section_title}</SubHeadline>
          <Headline>{vals.section_subtitle}</Headline>
          <p>{vals.section_description}</p>
        </HeadLineContainer>
      ))}
      <ValuesContainer>
        <ValuesContent>
          <ValuesCardContainer>
            <ValuesCard>
              <ColumnsContainer>
                <IconValues />
              </ColumnsContainer>
            </ValuesCard>
          </ValuesCardContainer>
        </ValuesContent>
      </ValuesContainer>
    </>
  )
}
