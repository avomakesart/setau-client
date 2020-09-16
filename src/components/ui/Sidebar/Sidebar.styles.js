import styled from 'styled-components'

export const SidebarWrapper = styled.div`
  position: fixed;
  bottom: -12.5rem;
  right: 0;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  background: #ffffff;
  width: 100%;
`

export const SidebarContainer = styled.div`
  position: sticky;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: hidden;
`

export const NavContainer = styled.div`
  border: 1px solid #ccc;
  height: auto;
  padding: 2.3rem 2rem;
  background-color: white;
  color: white;
  width: auto;
  position: absolute;
  z-index: 100;

  @media screen and (max-height: 450px) {
    padding-top: 15px;
  }
`

export const CloseBtn = styled.a`
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
`

export const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`
