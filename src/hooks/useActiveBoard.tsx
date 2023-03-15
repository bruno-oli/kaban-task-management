import React, { useContext, useEffect } from "react";
import { BoardsContext, IBoard } from "../contexts/BoardsContext";

interface IProps {
  activeBoard: IBoard | undefined;
  setActiveBoard: (id: number, obj: IBoard | undefined) => void;
}

const useActiveBoard = () => {
  const { boards, setBoards } = useContext(BoardsContext);
  const activeBoard = boards.find((i) => {
    return i.active;
  });
  const setActiveBoard = (id: number, obj?: IBoard | undefined) => {
    const boardsClone = [...boards];
    boardsClone.forEach((i) => {
      if (obj === undefined) {
        if (i.id === id) {
          i.active = true;
        } else {
          i.active = false;
        }
      } else {
        if (i.id === id) {
          i = obj;
        }
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
