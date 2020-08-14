import React from 'react'
import { FieldContainer, Label, FormInput } from './Input.styles'

const Input = ({
  errors,
  placeholder,
  label,
  id,
  type,
  name,
  onBlur,
  value,
  onChange,
  register,
  ...inputProps
}) => {
  return (
    <FieldContainer>
      <Label html={id}>{label}</Label>
      <FormInput
        ref={register}
        id={id}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        type={type}
      />
    </FieldContainer>
  )
}

export default Input
