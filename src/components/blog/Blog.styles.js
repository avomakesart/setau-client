import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 7rem;
  max-width: 470px;

  @media (min-width: 1000px) {
    max-width: 1170px;
  }
`

export const EntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`

export const EntryInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0;
`

export const EntryCardContainer = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr;
  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
`

// Image Styles
export const ImageContainer = styled.img`
  max-width: 100%;
  width: 100%;
  display: block;
`

// Blog card styles

export const BlogImageContainer = styled.div`
  position: relative;
  width: 100%;

  :hover {
    opacity: 1;
  }
`

export const BlogCardInfo = styled.div`
  position: absolute;
  top: 8px;
  left: 16px;
`

export const EntryDate = styled.h5`
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-transform: uppercase;
  padding-top: 5px;
  color: #878a8f;
`

export const StyledLink = styled(Link)`
text-decoration: none;
color: black;

:hover {
  text-decoration: underline;
}
`

export const BlogTitle = styled.h3`
  color: black;
  font-size: 48px;
  margin-top: 1.5rem;
  margin-bottom: 0rem;
`

export const AvatarContainer = styled.span`
  width: 3.75rem;
  height: 3.75rem;
  display: inline-block;
  position: relative;
  vertical-align: top;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(234, 234, 234);
  border-image: initial;
  border-radius: 50%;
  margin: 0px;
`

export const AvatarImage = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

export const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Separator = styled.hr`
  max-width: 100%;
  width: 100%;
  color: black;
  height: auto;
@media (min-width: 1000px) { display: none;} 
`