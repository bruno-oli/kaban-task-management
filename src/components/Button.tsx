import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: bold;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.5;
  }
`;

interface IButton {
  width: string;
  type: "primary" | "secondary" | "destructive";
  size: "large" | "small";
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  type,
  size,
  width,
  children,
  onClick = () => {},
}: IButton) => {
  const { colors, fontSizes } = useContext(ThemeContext);
  function getBackgroundColor(type: "primary" | "secondary" | "destructive") {
    switch (type) {
      case "primary":
        return colors.primaryColor;
      case "secondary":
        return colors.secondaryButtonCollor;
      case "destructive":
        return colors.deleteColor;
    }
  }

  return (
    <Wrapper
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      style={{
        background: getBackgroundColor(type),
        borderRadius: size === "large" ? "24px" : "20px",
        color: type === "secondary" ? colors.primaryColor : colors.white,
        width,
        height: size === "large" ? "48px" : "40px",
        fontSize: size === "large" ? fontSizes.headingM : fontSizes.bodyL,
      }}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
