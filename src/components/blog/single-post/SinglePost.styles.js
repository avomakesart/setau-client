import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 470px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1000px) {
    max-width: 900px;
  }
`

export const FeaturedImage = styled.img`
  max-width: 100%;
  width: 100%;
`

export const DateContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: 1rem;
  max-width: 100%;
`

export const ReadTime = styled.p`
  color: gray;
  margin-left: 0.3rem;
`

export const SinglePostTitle = styled.h1`
  font-size: 67px;
  text-align: left;
  margin-bottom: 0;
  @media (min-width: 1000px) {
    font-size: 97px;
  }
`

export const Separator = styled.hr`
  max-width: 100%;
  width: 100%;
  color: black;
  margin-top: 3rem;
`

export const CommentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const CommentDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`

export const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 18px;
`

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 8rem;
  font-family: inherit;
  font-size: 18px;
`

export const SubmitButton = styled.button`
  width: 100%;
  cursor: pointer;
  display: block;
  text-transform: uppercase;
  color: white;
  background: black;
  font-size: 18px;
  padding: 1rem;
  border: none;
  border-radius: 3px;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

export const ReturnButton = styled.button`
  max-width: 100%;
  width: 33%;
  align-items: rigth;
  cursor: pointer;
  text-transform: uppercase;
  color: white;
  background: black;
  font-size: 18px;
  padding: 1rem;
  border: none;
  border-radius: 3px;
  margin-top: 2rem;
  margin-bottom: 2rem;
`