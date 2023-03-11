import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeAppContext } from "./contexts/ThemeAppContext";
import GlobalTheme from "./styles/GlobalStyle";
import Header from "./views/Header";
import darkTheme from "./styles/themes/darkTheme";
import lightTheme from "./styles/themes/lightTheme";
import Container from "./styles/Container";
import NavBar from "./views/NavBar";

function App() {
  const { isDarkTheme } = useContext(ThemeAppContext);
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalTheme />
      <Container>
        <Header />
        <NavBar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
