import React, { RefObject, useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BoardsContext } from "../contexts/BoardsContext";
import useActiveBoard from "../hooks/useActiveBoard";

const Wrapper = styled.div`
  position: absolute;
  bottom: -100px;
  right: 0;
  background-color: ${(props) => props.theme.colors.elementBackground};
  width: 192px;
  height: 94px;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  visibility: hidden;
  opacity: 0;
  transition: 0.2s ease-out;
  box-shadow: 0px 4px 6px ${(props) => props.theme.colors.boxShadowColor};
  &.active {
    visibility: visible;
    opacity: 1;
  }
  button {
    cursor: pointer;
    width: 100%;
    text-align: left;
    background: none;
    outline: none;
    border: none;
    font-size: ${(props) => props.theme.fontSizes.bodyL};
    color: ${(props) => props.theme.colors.alternativeTextColor};
    font-weight: bold;
    &.delete {
      color: ${(props) => props.theme.colors.deleteColor};
    }
  }
`;

const MoreOptions = ({ refProp }: { refProp: RefObject<HTMLDivElement> }) => {
  const { boards, setBoards } = useContext(BoardsContext);
  const { activeBoard, setActiveBoard } = useActiveBoard();
  function removeBoard() {
    if (boards.length > 1) {
      const index = boards.findIndex((i) => {
        return i.id === activeBoard?.id;
      });
      if (index === 0) {
        setActiveBoard(boards[index + 1].id);
      } else {
        setActiveBoard(boards[0].id);
      }
      setBoards(
        boards.filter((i) => {
          return i.id !== activeBoard?.id;
        })
      );
      refProp.current?.classList.toggle("active");
      toast.success("The board has been successfully removed!", {
        className: "notification__box",
      });
    } else {
      toast.error("You need to have at least one board!", {
        className: "notification__box",
      });
      refProp.current?.classList.toggle("active");
    }
  }
  return (
    <Wrapper ref={refProp}>
      <button>Edit Board</button>
      <button className="delete" onClick={removeBoard}>
        Delete Board
      </button>
    </Wrapper>
  );
};

export default MoreOptions;
