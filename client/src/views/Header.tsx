import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { darken, opacify, transparentize } from "polished";

// * images
import logoLight from "../assets/logoLight.svg";
import logoDark from "../assets/logoDark.svg";
import { ThemeAppContext } from "../contexts/ThemeAppContext";
import iconVerticalElipsis from "../assets/icon-vertical-ellipsis.svg";

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
      button {
        cursor: pointer;
        width: 164px;
        height: 48px;
        border-radius: 24px;
        border: none;
        outline: none;
        color: ${(props) => props.theme.colors.white};
        background: ${(props) => props.theme.colors.primaryColor};
        font-weight: bold;
        font-size: ${(props) => props.theme.fontSizes.headingM};
        transition: background 0.3s;
        &:hover {
          background: ${(props) =>
            transparentize("0.5", props.theme.colors.primaryColor)};
        }
      }
      img {
        cursor: pointer;
      }
    }
  }
`;

const Header = () => {
  const { isDarkTheme } = useContext(ThemeAppContext);
  const { colors } = useContext(ThemeContext);
  return (
    <Wrapper>
      <div className="logo__container">
        <img src={isDarkTheme ? logoLight : logoDark} alt="logo" />
      </div>
      <div className="content">
        <h1>Platform Lauch</h1>
        <div>
          <button>+ Add New Task</button>
          <img src={iconVerticalElipsis} alt="" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
