import styled from 'styled-components'

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

export const ServiceBox = styled.div`
  height: 100px;
  width: 100%;
`

export const ValueCard = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
  margin: 0 auto;
`

export const IconImage = styled.img`
  width: 6rem;
  max-width: 100%;
`
