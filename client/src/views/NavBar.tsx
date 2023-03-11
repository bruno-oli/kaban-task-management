import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Switch from "react-switch";

// * images
import iconBoard from "../assets/icon-board-add.svg";
import iconDarkTheme from "../assets/icon-dark-theme.svg";
import iconLightTheme from "../assets/icon-light-theme.svg";
import { ThemeAppContext } from "../contexts/ThemeAppContext";

const Wrapper = styled.nav`
  grid-area: navbar;
  border-right: solid 1px ${(props) => props.theme.colors.borderColor};
  background-color: ${(props) => props.theme.colors.elementBackground};
  padding: 12px 34px 32px 34px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .boards {
    h2 {
      font-size: ${(props) => props.theme.fontSizes.headingS};
      color: ${(props) => props.theme.colors.alternativeTextColor};
      margin-bottom: 19px;
      font-weight: 700;
      letter-spacing: 2.4px;
    }
    & > button {
      height: 48px;
      display: flex;
      align-items: center;
      gap: 15px;
      border: none;
      outline: none;
      background: none;
      font-size: ${(props) => props.theme.fontSizes.headingM};
      color: ${(props) => props.theme.colors.primaryColor};
      font-weight: bold;
      cursor: pointer;
    }
  }
  .config {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    .theme {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 23px;
      width: 100%;
      height: 48px;
      background-color: ${(props) => props.theme.colors.bodyBackground};
      border-radius: 6px;
    }
  }
`;

const NavBar = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeAppContext);
  const { colors } = useContext(ThemeContext);
  return (
    <Wrapper>
      <div className="boards">
        <h2>ALL BOARS (5)</h2>
        <div className="items"></div>
        <button>
          <img src={iconBoard} alt="" /> + Create New Board
        </button>
      </div>
      <div className="config">
        <div className="theme">
          <img src={iconLightTheme} alt="" />
          <Switch
            onChange={() => setIsDarkTheme(!isDarkTheme)}
            checked={isDarkTheme}
            width={40}
            height={20}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor={colors.primaryColor}
            offColor={colors.primaryColor}
          />
          <img src={iconDarkTheme} alt="" />
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
