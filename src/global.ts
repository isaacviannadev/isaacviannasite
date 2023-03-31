import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    background-color: #151515;
    color: #AEAEAE; 

    background-image: url('/bg.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    background: linear-gradient(94.86deg, #FFFFFF 5.89%, rgba(255, 255, 255, 0.17) 98.64%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;

    text-align: center;
  }

  h1 {
    font-size: 5.4rem;
  }
  h2 {
    font-size: 3.6rem;
  }

  a, button {
    cursor: pointer;
  }

  a, button {
    text-decoration: none;
    color: inherit;

    font-size: 1.4rem;
    font-weight: 300;
    transition: all 0.2s;

    &:hover {
      color: #c7c7c7;
    }
  }
`;

export default GlobalStyles;
