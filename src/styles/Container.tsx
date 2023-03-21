import React, { useContext } from "react";
import styled from "styled-components";
import { NavComportamentContext } from "../contexts/NavComportamentContext";

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 12% 88%;
  grid-template-areas:
    "header header"
    "navbar content";
  transition: 0.6s;
  &.hideen {
    grid-template-columns: 0% 100%;
    nav {
      visibility: hidden;
      transition: opacity 0.6s;
      opacity: 0;
    }
  }
  @media only screen and (max-width: 900px)  {
    grid-template-columns: 40% 60%;
  }
`;

const Container = ({ children }: { children: React.ReactNode }) => {
  const { isHideen } = useContext(NavComportamentContext);
  return <Wrapper className={isHideen ? "hideen" : ""}>{children}</Wrapper>;
};

export default Container;
