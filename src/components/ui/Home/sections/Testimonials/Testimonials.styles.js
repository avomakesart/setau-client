import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`

export const HeadLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
`
export const SubHeadline = styled.span`
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 4px;
`

export const Headline = styled.h2`
  font-size: 25px;
  line-height: 1.6;
  font-weight: 800;
  @media (min-width: 576px) {
    font-size: 35px;
    line-height: 1.6;
  }

  @media (min-width: 960px) {
    font-size: 45px;
    line-height: 1.5;
  }
`
export const TestimonialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1000px) {
    width: 900px;
    flex-direction: row;
    justify-content: space-around;
  }
`

export const TestimonialContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`

export const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const TestimonialName = styled.p`
  font-size: inherit;
  font-weight: regular;
  margin-left: 1rem;
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
