import styled from 'styled-components'

export const HeroSection = styled.section`
  background-color: #293370;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
`

export const HeroOverlay = styled.div`
  background-color: transparent;
  background-image: linear-gradient(
    180deg,
    rgba(41, 51, 112, 0.36) 0%,
    #293370 100%
  );
  opacity: 1;
  transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
  height: 88%;
  width: 100%;
  left: 0;
  position: absolute;
`

export const HeroContainer = styled.div`
  display: flex;
  margin: 0 auto;
  height: 37rem;
  position: relative;
  max-width: 800px;
`

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`

export const HeroSubtitle = styled.span`
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-align: center;
`

export const HeroTitle = styled.h1`
  color: white;
  font-size: 35px;
  line-height: 1.6;
  font-weight: 800;
  font-family: inherit;
  text-align: center;

  @media (min-width: 576px) {
    font-size: 45px;
    line-height: 1.6;
  }

  @media (min-width: 960px) {
    font-size: 65px;
    line-height: 1.2;
  }
`

export const HeroButton = styled.button`
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  font-style: normal;
  letter-spacing: 2px;
  fill: #ffffff;
  color: #ffffff;
  background-color: #ec5f28;
  border-radius: 999px 999px 999px 999px;
  margin: 0 auto;
  padding: 20px 40px;
  width: 80%;

  @media (min-width: 1000px) {
    width: 12rem;
  }
`

export const ButtonContainer = styled.div`
  margin: 0 auto;
`
