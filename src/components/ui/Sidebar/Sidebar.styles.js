import styled from 'styled-components'

export const SidebarWrapper = styled.div`
  position: fixed;
  bottom: -12rem;
  right: 0;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  background: #d2d2d2;
  width: 20%;
`

export const SidebarContainer = styled.div`
  position: sticky;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
`

export const NavContainer = styled.nav`
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  flex-direction: column !important;
`

export const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`
