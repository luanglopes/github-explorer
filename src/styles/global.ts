import { createGlobalStyle } from 'styled-components'

import githubBackgroundSVG from '../assets/github-background.svg'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: url(${githubBackgroundSVG}) no-repeat 70% top;
    background-color: #f0f0f5;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
`

export default GlobalStyle
