import styled from 'styled-components'
import Input from 'react-validation/build/input'
import { Link } from 'react-router-dom'

export const Section = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  background: #f5f7fb;
`

export const Container = styled.div`
  width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1280px) {
    max-width: 1200px;
  }
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
`

export const Column = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  margin-right: auto !important;
  margin-left: auto !important;
  max-width: 24rem;
`

export const LogoContainer = styled.div`
  margin-bottom: 2rem !important;
  text-align: center !important;
`

export const Logo = styled.img`
  height: 2rem !important;
  max-width: 100%;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #fff;
  background-clip: initial;
  border: 1px solid rgba(0, 40, 100, 0.12);
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
`

export const CardBody = styled.div`
  flex: 1 1 auto;
  margin: 0;
  padding: 2rem !important;
  position: relative;
  width: 100%;
`

export const CardTitle = styled.div`
  font-size: 1.125rem;
  line-height: 1.2;
  font-weight: 400;
  margin-bottom: 1.5rem;
`

export const FieldContainer = styled.div`
  display: block;
  margin-bottom: 1rem;
`

export const Label = styled.div`
  margin-bottom: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
  display: block;
`

export const FormInput = styled(Input)`
  display: block;
  width: 76%;
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 40, 100, 0.12);
  border-radius: 3px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const CardFooter = styled.div`
  margin-top: 2rem;
  margin-bottom: 0;
`

export const Button = styled.button`
  color: #fff;
  background-color: #467fcf;
  border-color: #467fcf;
  display: block;
  width: 83%;
  font-weight: 600;
  letter-spacing: 0.03em;
  font-size: 0.8125rem;
  min-width: 2.375rem;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  line-height: 1.84615385;
  border-radius: 3px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledLink = styled(Link)`
  color: #000;
  margin-top: 1rem;
`