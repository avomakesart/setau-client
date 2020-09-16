import React from 'react'
import { Label, InputTitle } from './Input.styles'

const TitleInput = ({
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
      <InputTitle
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

export default TitleInput
