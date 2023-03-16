import React, { createContext, useEffect, useState } from "react";
import getRandomColor from "../functions/getRandomColor";

export interface ITask {
  id: string;
  name: string;
  description: string;
  status: IColumn;
}

export interface IColumn {
  id: string;
  name: string;
  color: string;
  tasks: ITask[];
}

export interface IBoard {
  id: string;
  name: string;
  columns: IColumn[];
  active: boolean;
}

interface IContext {
  columns: IColumn[];
  setColumns: (newState: IColumn[]) => void;
  boards: IBoard[];
  setBoards: (newState: IBoard[]) => void;
}

export const INITIAL_BOARDS_VALUE: IContext = {
  columns: [
    {
      id: crypto.randomUUID(),
      name: "Todo",
      tasks: [],
      color: getRandomColor(),
    },
    {
      id: crypto.randomUUID(),
      name: "Doing",
      tasks: [],
      color: getRandomColor(),
    },
  ],
  setColumns: () => {},
  boards: [
    {
      id: crypto.randomUUID(),
      name: "Welcome!",
      columns: [],
      active: true,
    },
  ],
  setBoards: () => {},
};

export const BoardsContext = createContext<IContext>(INITIAL_BOARDS_VALUE);

const BoardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<IColumn[]>(
    INITIAL_BOARDS_VALUE.columns
  );

  // * Final Board
  const [boards, setBoards] = useState<IBoard[]>(INITIAL_BOARDS_VALUE.boards);

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
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

export default BoardsProvider;
