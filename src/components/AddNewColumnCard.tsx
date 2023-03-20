import { transparentize } from "polished";
import React, { useContext } from "react";
import styled from "styled-components";
import _ from "lodash";
import { BoardsContext } from "../contexts/BoardsContext";
import useActiveBoard from "../hooks/useActiveBoard";
import getRandomColor from "../functions/getRandomColor";
import { toast } from "react-toastify";

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
  const { boards, setBoards } = useContext(BoardsContext);
  const { activeBoard } = useActiveBoard();
  function addNewColumn() {
    const cloneBoards = _.cloneDeep(boards);
    const boardIndex = boards.findIndex((i) => {
      return i.id === activeBoard?.id;
    });
    cloneBoards[boardIndex].columns.push({
      id: crypto.randomUUID(),
      name: "New Column",
      tasks: [],
      color: getRandomColor(),
    });
    setBoards(cloneBoards);
    toast.success("Column created successfully!", {
      className: "notification__box",
    });
  }
  return (
    <Wrapper onClick={addNewColumn}>
      <span>+ New Column</span>
    </Wrapper>
  );
};

export default AddNewColumnCard;
