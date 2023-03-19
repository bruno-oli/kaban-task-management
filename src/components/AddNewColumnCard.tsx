import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
  width: 20%;
  background-color: ${(props) =>
    transparentize(0.5, props.theme.colors.elementBackground)};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px ${(props) => props.theme.colors.boxShadowColor};
  span {
    font-size: ${(props) => props.theme.fontSizes.headingX};
    color: ${(props) => props.theme.colors.alternativeTextColor};
    font-weight: bold;
  }
`;

const AddNewColumnCard = () => {
  return (
    <Wrapper>
      <span>+ New Column</span>
    </Wrapper>
  );
};

export default AddNewColumnCard;
