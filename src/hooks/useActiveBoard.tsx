import React, { useContext } from "react";
import { BoardsContext } from "../contexts/BoardsContext";

const useActiveBoard = () => {
  const { activeBoardId, boards } = useContext(BoardsContext);
  return boards.find((i) => i.id === activeBoardId)
};

export default useActiveBoard;
