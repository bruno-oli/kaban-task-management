import React from "react";
import styled from "styled-components";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 12% 88%;
  grid-template-areas:
    "header header"
    "navbar content";
`;

export default Container;
