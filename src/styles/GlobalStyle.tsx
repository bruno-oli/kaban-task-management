import { createGlobalStyle } from "styled-components";

const GlobalTheme = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Plus Jakarta Sans", sans-serif;
  }
  body {
    background-color: ${(props) => props.theme.colors.bodyBackground};
    .notification__box {
      z-index: 4;
      background-color: ${(props) => props.theme.colors.elementBackground};
      color: ${(props) => props.theme.colors.textColor};
    }
  }
  h1, h2, h3, span, a, label, input {
    color: ${(props) => props.theme.colors.textColor};
  }
`;

export default GlobalTheme;
