import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    padding: 0 20px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 75px;
  }
`;
