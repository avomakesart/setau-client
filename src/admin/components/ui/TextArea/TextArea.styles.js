import styled from 'styled-components'

export const TextAreaInput = styled.textarea`
  font-size: 17px;
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  letter-spacing: 0px;
  width: 80%;
  border: none;
  margin: 0.7rem 0;
  padding: 1rem 0.75rem;

  :focus {
    outline-color: rgba(66, 88, 99, 0.4);
  }
`

export const Label = styled.label`
  font-weight: 700;
  font-size: 25px;
  margin-left: 0.5rem;
`
