import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Section = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  background: #f5f7fb;
  width: 100%;
`

export const MidSection = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  background: #f5f7fb;
  width: 80%;
`

export const Container = styled.div`
  width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 768px) {
    max-width: 540px;
  }

  @media (min-width: 992px) {
    max-width: 720px;
  }
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 0;
  flex-grow: 1;
  margin-right: auto !important;
  margin-left: auto !important;
`

export const ColumnRow = styled.div`
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  flex-direction: column;
  margin-right: auto !important;
  margin-left: auto !important;

  @media (min-width: 1000px) {
    justify-content: space-around;
    flex-direction: row;
  }
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
  margin: 0 auto;
`

export const CardTitle = styled.div`
  font-size: 1.125rem;
  line-height: 1.2;
  font-weight: 400;
  margin-bottom: 1.5rem;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`

export const LinkButton = styled(Link)`
  color: #fff;
  background-color: #467fcf;
  border-color: #467fcf;
  display: block;
  width: auto;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  font-size: 0.8125rem;
  min-width: 2.375rem;
  margin-top: 2rem;
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

export const Button = styled.button`
  color: #fff;
  background-color: #467fcf;
  border-color: #467fcf;
  display: auto;
  width: 100%;
  text-decoration: none;
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

export const DangerButton = styled.button`
  color: #fff;
  background-color: crimson;
  border-color: none;
  display: block;
  width: 100%;
  margin-top: 3rem;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.03em;
  font-size: 0.8125rem;
  min-width: 2.375rem;
  cursor: pointer;
  margin-top: 1rem;
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

export const DisabledButton = styled.button`
  color: white;
  background-color: gray;
  border-color: none;
  display: block;
  width: auto;
  text-decoration: none;
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
  justify-content: space-evenly;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`

export const StyledLink = styled(Link)`
  color: #000;
  margin-top: 1rem;
`

export const NavLink = styled(Link)`
  color: #6d6d6d;
  font-size: 14px;
  font-weight: 700;
  line-height: 3;
  text-transform: uppercase;
  text-align: start;
  letter-spacing: 0.08em;
  text-decoration: none;

  @media (min-width: 600px) {
    color: #1a1a1a;
    padding-right: 7px;
    padding-left: 7px;
  }
`

export const ValuesGrid = styled.div`
  display: grid;
  flex-direction: column;
  grid-gap: 1rem;

  @media (min-width: 1000px) {
    height: auto;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(1, 1fr);
  }
`

export const ServiceBox = styled.div`
  height: 100px;
  width: 100%;
`

export const ValueCard = styled.div`
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


