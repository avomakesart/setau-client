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

 .left {
   text-align: left!important;
 }

 .right {
   text-align: right;
 }

 .w-auto {
   width: auto;
 }
`

export default GlobalStyle
