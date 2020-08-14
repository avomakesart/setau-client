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
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`

export const NavItem = styled(NavLink)`
  color: #404248;
  margin-left: 35px;
  text-decoration: none;
`
