import React from 'react'

import {
  SidebarWrapper,
  SidebarContainer,
  NavContainer,
  NavLinkContainer,
} from './Sidebar.styles'

export const Sidebar = ({ children }) => {
  return (
    <SidebarWrapper>
      <SidebarContainer>
        <NavContainer>
          <NavLinkContainer>{children}</NavLinkContainer>
        </NavContainer>
      </SidebarContainer>
    </SidebarWrapper>
  )
}
