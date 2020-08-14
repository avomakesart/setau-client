import React from 'react'
import { FieldContainer, Label, FormTextArea } from './TextArea.styles'

export default function TextArea({
  error,
  label,
  id,
  type,
  onBlur,
  name,
  value,
  onChange,
  rows,
  register,
  placeholder,
  ...inputProps
}) {
  return (
    <FieldContainer>
      <Label>{label}</Label>
      <FormTextArea
        type={type}
        onBlur={onBlur}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        rows={rows}
        id={id}
        register={register}
        placeholder={placeholder}
      />
    </FieldContainer>
  )
}
