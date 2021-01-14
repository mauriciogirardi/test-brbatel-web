import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
   *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #EEEEEE  ;
    height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  h1,h2,h3,h4,h5,h6,strong {
    font-weight: 500;
  }

  body,input,button, select {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }
`;
