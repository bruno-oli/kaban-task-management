import React, { createContext, useEffect, useState } from "react";
import getRandomColor from "../functions/getRandomColor";

export interface ITask {
  id: number;
  description: string;
  status: IColumn;
}

export interface IColumn {
  id: number;
  name: string;
  color: string;
  tasks: ITask[];
}

export interface IBoard {
  id: number;
  name: string;
  columns: IColumn[];
}

interface IContext {
  columns: IColumn[];
  setColumns: (newState: IColumn[]) => void;
  boards: IBoard[];
  setBoards: (newState: IBoard[]) => void;
  activeBoardId: number;
  setActiveBoardId: (newState: number) => void;
}

export const INITIAL_BOARDS_VALUE: IContext = {
  columns: [
    {
      id: 1,
      name: "Todo",
      tasks: [],
      color: getRandomColor(),
    },
    {
      id: 2,
      name: "Doing",
      tasks: [],
      color: getRandomColor(),
    },
  ],
  setColumns: () => {},
  boards: [
    {
      id: 1,
      name: "Welcome!",
      columns: [],
    },
  ],
  setBoards: () => {},
  activeBoardId: 1,
  setActiveBoardId: () => {},
};

export const BoardsContext = createContext<IContext>(INITIAL_BOARDS_VALUE);

const BoardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<IColumn[]>(
    INITIAL_BOARDS_VALUE.columns
  );

  // * Final Board
  const [boards, setBoards] = useState<IBoard[]>(INITIAL_BOARDS_VALUE.boards);

  // * Active Board
  const [activeBoardId, setActiveBoardId] = useState(
    INITIAL_BOARDS_VALUE.activeBoardId
  );

  const [isLoading, setIsLoading] = useState(true);

  // * Get boards from local storage
  useEffect(() => {
    function getBoards() {
      if (localStorage.getItem("boards")) {
        setBoards(
          JSON.parse(
            localStorage.getItem("boards") || `${INITIAL_BOARDS_VALUE.boards}`
          )
        );
      }
      setIsLoading(false);
    }
    getBoards();
  }, []);

  // * Set theme in local storage
  useEffect(() => {
    function setBoards() {
      if (isLoading === false) {
        localStorage.setItem("boards", JSON.stringify(boards));
      }
    }
    setBoards();
  }, [boards]);

  return (
    <BoardsContext.Provider
      value={{
        columns,
        setColumns,
        boards,
        setBoards,
        activeBoardId,
        setActiveBoardId,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

export default BoardsProvider;
