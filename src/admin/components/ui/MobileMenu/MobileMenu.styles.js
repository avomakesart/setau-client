import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledMenu = styled.nav`
  display: none;

  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    background: white;
    height: 100vh;
    text-align: left;
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    display: ${({ open }) => (open ? 'flex' : 'none')};
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
  }
`

export const MobileLink = styled(Link)`
  font-size: 2rem;
  text-transform: uppercase;
  padding: 2rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: black;
  text-decoration: none;
  transition: color 0.3s linear;

  @media (max-width: 800px) {
    font-size: 1.5rem;
    text-align: center;
  }

  &:hover {
    color: gray;
  }
`

export const MobileSearchInput = styled.input`
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  width: 66%;
  margin: 0 auto;
  padding: 7px 33px;
  border-radius: 3px;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;
  &:active,
  &:focus {
    text-align: left;
  }
`
