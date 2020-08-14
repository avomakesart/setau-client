import styled from 'styled-components'


export const StyledButton = styled.button`
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border: none;
  cursor: pointer;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-style: normal;
  letter-spacing: 2px;
  fill: #ffffff;
  margin: 0 auto;
  padding: 20px 40px;
  width: 100%;
  min-width: 64px;
`
