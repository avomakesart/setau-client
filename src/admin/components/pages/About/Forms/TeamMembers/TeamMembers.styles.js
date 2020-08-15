import styled from 'styled-components'

export const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 7rem auto;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 5rem;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`

export const TeamCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
`

export const ClientCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
`

export const FullColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem auto 0;
  position: relative;
  box-sizing: border-box;
  --row-gap: calc(0 * 16pt);
  justify-content: normal;
  align-items: normal;
  width: 100%;
  align-items: center;
  padding: 2rem;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`

export const FullColumn = styled.div`
  float: left;
  box-sizing: border-box;
  padding-left: calc(var(--row-gap) / 2);
  padding-right: calc(var(--row-gap) / 2);
  width: 100%;
  margin-left: 0%;

  @media (min-width: 1000px) {
    width: 70%;
  }
`

export const MediumColumn = styled.div`
  float: left;
  box-sizing: border-box;
  padding-left: calc(var(--row-gap) / 2);
  padding-right: calc(var(--row-gap) / 2);
  width: 100%;
  margin-left: 0%;

  @media (min-width: 1000px) {
    width: 60.3333%;
  }
`

export const CardContentContainer = styled.div`
  margin: 0 auto;
  padding: 5rem;
`

export const ValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  width: 100%;
`

export const ValuesContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`

export const ValuesCardContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

export const ValuesCard = styled.div`
  background: #fff;
  border-radius: 2px;
  height: auto;
  position: relative;
  width: 100%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 3rem;
`

export const ValueCard = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
  margin: 0 auto;
`

export const ColumnsContainer = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  margin: 3rem;
  --row-gap: calc(0 * 16pt);
  justify-content: normal;
  align-items: normal;
`

export const ValuesGrid = styled.div`
  display: grid;
  flex-direction: column;
  grid-gap: 1rem;

  @media (min-width: 1000px) {
    height: auto;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
`

export const ColoredSection = styled.section`
  background: black;
  color: white;
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

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
`

export const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
`

export const IconImage = styled.img`
  width: 6rem;
  max-width: 100%;
`

export const TeamImage = styled.img`
  max-width: 100%;
  height: 100%;
  width: 100%;
`

export const Separator = styled.hr`
  width: 50%;
  margin: 5rem auto;
  color: black;
`

export const ClientGrid = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 1rem 0;

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export const AvatarContainer = styled.span`
  width: 3.75rem;
  height: 3.75rem;
  background-color: rgb(255, 255, 255);
  margin: 0 auto;
  overflow: hidden;
`

export const AvatarImage = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

