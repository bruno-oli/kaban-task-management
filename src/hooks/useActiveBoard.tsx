import React, { useContext, useEffect } from "react";
import { BoardsContext, IBoard } from "../contexts/BoardsContext";

interface IProps {
  activeBoard: IBoard | undefined;
  setActiveBoard: (id: string) => void;
}

const useActiveBoard = () => {
  const { boards, setBoards } = useContext(BoardsContext);
  const activeBoard = boards.find((i) => {
    if (i !== undefined) {
      return i.active;
    }
  });
  const setActiveBoard = (id: string) => {
    const boardsClone = [...boards];
    boardsClone.forEach((i) => {
      if (i.id === id) {
        i.active = true;
      } else {
        i.active = false;
      }
    });
    setBoards(boardsClone);
  };
  const values: IProps = {
    activeBoard,
    setActiveBoard,
  };
  return values;
};

export default useActiveBoard;
