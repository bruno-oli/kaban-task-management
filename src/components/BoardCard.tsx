import React from "react";
import styled from "styled-components";
import { IBoard } from "../contexts/BoardsContext";

import iconBoard from "../assets/icon-board.svg";

const Wrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
  span {
    font-weight: bold;
    font-size: ${(props) => props.theme.fontSizes.headingM};
  }
`;

const BoardCard = ({ item }: { item: IBoard }) => {
  return (
    <Wrapper>
      <img src={iconBoard} alt="icon board" />
      <span>{item.name}</span>
    </Wrapper>
  );
};

export default BoardCard;
