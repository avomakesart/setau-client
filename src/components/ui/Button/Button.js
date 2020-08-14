import React from 'react'
import { StyledButton } from './Button.styles'

export default function Button({
  children,
  onChange,
  onClick,
  onSubmit,
  type,
  className,
  style,
}) {
  return (
    <StyledButton
      onChange={onChange}
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
      className={className}
      style={style}
    >
      {children}
    </StyledButton>
  )
}
