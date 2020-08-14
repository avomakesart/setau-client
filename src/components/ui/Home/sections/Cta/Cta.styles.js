import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;