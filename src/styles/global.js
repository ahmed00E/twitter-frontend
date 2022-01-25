import { createGlobalStyle } from "styled-components"

import { white } from './colors'

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    color: ${white};
    font-family: 'Chirp';
  }

  .modal-content {
    background: transparent;
    border: none;
  }

  a {
    text-decoration: none;
    color: ${white};

    &:hover {
      color: ${white};
    }
  }
`

export default GlobalStyle
