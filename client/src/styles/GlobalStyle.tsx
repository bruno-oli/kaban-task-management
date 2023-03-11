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
  }
  h1, h2, h3, span, a {
    color: ${(props) => props.theme.colors.textColor};
  }
`;

export default GlobalTheme;
