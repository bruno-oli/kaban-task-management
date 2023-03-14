import React, { useContext } from "react";
import { BoardsContext, IBoard } from "../contexts/BoardsContext";

interface IProps {
  activeBoard: IBoard | undefined;
  setActiveBoard: (newState: number) => void;
}

const useActiveBoard = () => {
  const { boards, setBoards } = useContext(BoardsContext);
  const activeBoard = boards.find((i) => {
    return i.active;
  });
  const setActiveBoard = (id: number) => {
    const boardsClone = [...boards];
    boardsClone.forEach((i) => {
      if (i.id === id) {
        i.active = true;
      } else {
        i.active = false;
      }
    });
    setBoards(boardsClone)
  };
  const values: IProps = {
    activeBoard,
    setActiveBoard,
  };
  return values;
};

export default useActiveBoard;
