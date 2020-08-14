import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'

export const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  max-height: 700px;
  width: 100%;
`

export const Navigation = styled.nav`
  background-color: #fff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #dcdcdc;
`

export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
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
  align-items: end;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

export const NavItem = styled(NavLink)`
  color: #404248;
  margin-left: 1rem;
  text-decoration: none;
`

export const DropItem = styled(NavLink)`
  color: #404248;
  margin-top: 1rem;
  text-decoration: none;
  text-transform: none;
`

export const NavItemButton = styled.span`
  color: #404248;
  margin-left: 2rem;
  text-decoration: none;
`

export const Role = styled.p`
  margin-left: 1rem;
  font-size: 0.9rem;
  text-align: center;
  color: #404248;
`

export const AvatarContainer = styled.span`
  width: 3.75rem;
  height: 3.75rem;
  background-color: rgb(255, 255, 255);
  margin-left: 1rem;
  overflow: hidden;
`

export const AvatarImage = styled.img`
  display: inline-block;
  width: 80%;
  height: 80%;
  border-radius: 50%;
`

// Second Navbar

export const DropDown = styled.div`
  position: absolute;
  width: 12rem;
  height: 7.5rem;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 12rem;
  left: 5.5rem;
  z-index: 5;

  @media (min-width: 1260px) {
    left: 8.5rem;
  }
`

export const DropDownBlog = styled.div`
  position: absolute;
  width: 12rem;
  height: 5.5rem;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 12rem;
  left: 18.5rem;
  z-index: 5;
`

export const DropItemContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`
