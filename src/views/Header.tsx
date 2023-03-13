import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { darken, opacify, transparentize } from "polished";

// * images
import logoLight from "../assets/logoLight.svg";
import logoDark from "../assets/logoDark.svg";
import { ThemeAppContext } from "../contexts/ThemeAppContext";
import iconVerticalElipsis from "../assets/icon-vertical-ellipsis.svg";
import Button from "../components/Button";
import { BoardsContext } from "../contexts/BoardsContext";
import useActiveBoard from "../hooks/useActiveBoard";

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  grid-area: header;
  background-color: ${(props) => props.theme.colors.elementBackground};
  .logo__container {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 34px;
    border-right: solid 1px ${(props) => props.theme.colors.borderColor};
  }
  .content {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    border-bottom: solid 1px ${(props) => props.theme.colors.borderColor};
    h1 {
      font-size: ${(props) => props.theme.fontSizes.headingX};
    }
    & > div {
      display: flex;
      gap: 24px;
      align-items: center;
      img {
        cursor: pointer;
      }
    }
  }
`;

const Header = () => {
  const { isDarkTheme } = useContext(ThemeAppContext);
  const activeBoard = useActiveBoard();
  return (
    <Wrapper>
      <div className="logo__container">
        <img src={isDarkTheme ? logoLight : logoDark} alt="logo" />
      </div>
      <div className="content">
        <h1>{activeBoard?.name}</h1>
        <div>
          <Button type="primary" size="large" width="164px">
            + Add New Task
          </Button>
          <img src={iconVerticalElipsis} alt="" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
