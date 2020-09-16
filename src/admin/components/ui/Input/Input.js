import React from 'react'
import { FormInput, Label } from './Input.styles'

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
  style,
  ...inputProps
}) => {
  return (
    <>
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
        style={style}
      />
    </>
  )
}

export default Input
