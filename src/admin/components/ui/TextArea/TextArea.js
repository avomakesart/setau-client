import React from 'react'
import { Label, TextAreaInput } from './TextArea.styles'

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
    <>
      <Label>{label}</Label>
      <TextAreaInput
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
    </>
  )
}
