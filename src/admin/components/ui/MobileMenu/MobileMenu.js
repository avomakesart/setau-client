import React from 'react'
import { StyledMenu, MobileLink } from './MobileMenu.styles'
import { MobileSearchInput } from './MobileMenu.styles'
const MobileMenu = ({ open, setOpen, children }) => {
  return (
    <StyledMenu open={open}>
      <MobileSearchInput placeholder="Busca tus productos..." />
      {children}
    </StyledMenu>
  )
}

export default MobileMenu
