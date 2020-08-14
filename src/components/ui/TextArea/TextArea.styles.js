import styled from 'styled-components'

export const FieldContainer = styled.div`
  display: block;
  margin-bottom: 1rem;
`

export const Label = styled.div`
  margin-bottom: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
  display: block;
`

export const FormTextArea = styled.textarea`
  display: block;
  width: 76%;
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 40, 100, 0.12);
  border-radius: 3px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: auto;
  resize: vertical;
  margin: 0;
  font-family: inherit;
`
