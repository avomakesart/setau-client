import styled from 'styled-components'

export const HomeWrapper = styled.div`
  padding: 2rem;

  @media (min-width: 1000px) {
    padding: 0;
  }
`

export const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 7rem auto;
`

export const FullColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  --row-gap: calc(0 * 16pt);
  justify-content: normal;
  align-items: normal;
  width: 100%;

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
    width: 60.3333%;;
  }
`

export const CardContentContainer = styled.div`
  margin: 0 auto;
  padding: 5rem;
`

export const ImageContainer = styled.img`
  max-width: 100%;
  width: 100%;
  height: 100%;
  display: block;
`
