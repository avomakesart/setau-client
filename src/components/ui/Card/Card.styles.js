import styled from 'styled-components'

export const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  width: 100%;
`
export const ProjectsListContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

export const ProjectCard = styled.div`
  background: #fff;
  border-radius: 2px;
  height: auto;
  position: relative;
  width: 100%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 3rem;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
`

export const FullColumnsContainer = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  --row-gap: calc(0 * 16pt);
  justify-content: normal;
  align-items: normal;
`

export const MediumColumn = styled.div`
  float: left;
  box-sizing: border-box;
  padding-left: calc(var(--row-gap) / 2);
  padding-right: calc(var(--row-gap) / 2);
  width: 60.3333%;
  margin-left: 0%;
`

export const CardContentContainer = styled.div`
  margin: 0 auto;
  padding: 5rem;
`

export const FullColumn = styled.div`
  float: left;
  box-sizing: border-box;
  padding-left: calc(var(--row-gap) / 2);
  padding-right: calc(var(--row-gap) / 2);
  width: 70%;
  margin-left: 0%;
`
