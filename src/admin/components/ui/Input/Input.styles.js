import styled from 'styled-components';

export const FormInput = styled.input`
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

export const InputTitle = styled.input`
  font-size: 66px;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
  width: 98%;
  border: none;
  padding: 1.375rem 0.75rem;

  :focus {
    outline-color: rgba(66, 88, 99, 0.4);
  }
`

export const Label = styled.label`
  font-weight: 700;
  font-size: 25px;
  margin-left: 0.5rem;
`

export const InputWrapper = styled.div`
  border: 1px solid rgba(66, 88, 99, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;
`

export const InputWrapperInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 3rem 3rem 0;

  :last-child {
    margin-bottom: 3rem;
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`