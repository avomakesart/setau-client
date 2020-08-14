import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
 html, body {
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
    background-color: #fff;
  }
  .wrapper {
    display: flex;
    max-width: 100%;
    min-height: 100vh;
    flex-direction: column;
  }

  p {
    font-size: 18px;
    line-height: 1.334;
    
    @media (min-width: 521px) {
      font-size: 1rem;
    }
  }
  
  h1 {
     font-size: 97px;
     letter-spacing: -1.5px;
  }

  h2 { 
    font-size: 61px;
    letter-spacing: -0.5px;
  }

  h3 {
     font-size: 48px;
     letter-spacing: 0px;
  }

  h4 { 
    font-size: 34px;
    letter-spacing: 0.25px;
  }

  h5 {
    font-size: 24px;
    letter-spacing: 0px;
  }

  h5 {
    font-size: 20px;
    letter-spacing: 0.15px;
  }

  button {
    font-size: 12.5px;
    font-weight: normal;
    text-transform: uppercase;
  }

  .center {
    text-align: center;
  }

  .toggle {
  height: 50px;
  border-top-right-radius: 10rem;
  border-bottom-right-radius: 9rem;
  width: 10px;
  position: absolute;
  outline: none;
  z-index: 1;
  background-color: rgba(64, 194, 133, 0.693);
  border-color: rgba(64, 194, 133, 0.693);
  border-left: 0;
  }
  .side-bar {
  height: 100% !important;
  display: flex;
  flex-direction: column;
  border-right: 1px solid;
  border-radius: 0;
  border-color: rgba(64, 194, 133, 0.693);
  background-color: rgb(255, 255, 255);
  transition: 0.8s ease;
}
`

export default GlobalStyle
