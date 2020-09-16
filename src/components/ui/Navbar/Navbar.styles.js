import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  max-height: 700px;
  width: 100%;
`

export const Navigation = styled.nav`
  background-color: #fff;
  padding: 2rem;
`

export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const NavBrandContainer = styled.div`
  padding: 3rem;
`

export const NavBrand = styled(Link)`
  color: #404248;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
`

export const NavLinksContainer = styled.div`
  display: none;

  @media (min-width: 1000px) {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }
`
export const NavItem = styled(NavLink)`
  color: #404248;
  margin-left: 35px;
  text-decoration: none;
`

export const MobileLinkContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  z-index: 12;

  @media (min-width: 1000px) {
    display: none;
  }
`

export const MobileNavContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: 0.5s;
`

export const MobileNavContent = styled.nav`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 20%;
  width: 100%;
  text-align: center;
`

export const MobileStyledButton = styled.button`
  display: flex;
  align-items: center;

  :focus {
    outline: none;
  }
`

export const MobileItem = styled(Link)`
  color: #404248;
  font-size: 3rem;
  margin-top: 30px;
  text-decoration: none;

  :hover {
    color: #c2c2c2;
  }
`
