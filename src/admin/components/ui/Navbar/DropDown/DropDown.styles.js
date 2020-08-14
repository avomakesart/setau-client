import styled from 'styled-components'

export const DDWrapper = styled.div`
  display: flex;
  min-height: 38px;
  flex-wrap: wrap;
`

export const DDHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  margin-left: 2rem;
  &::after {
    border: none;
  }
`

export const DDlist = styled.ul`
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  padding: 0;
  margin: 0;
  width: 13rem;
  margin-top: 3rem;
  margin-left: 1rem;
  position: absolute;
  z-index: 1;

  li {
    list-style-type: none;
  }

  :first-of-type {
    > button {
      border-top: 1px solid #ccc;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }

  :last-of-type > button {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  :focus {
    border: none;
  }
`

export const Button = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-size: 16px;
  padding: 15px 20px 15px 20px;
  border: 0;
  border-bottom: 1px solid #ccc;
  width: 100%;
  text-align: left;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: #ccc;
  }
`
