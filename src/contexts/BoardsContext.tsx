import React, { createContext, useEffect, useState } from "react";

export interface ISubTask {
  id: string;
  name: string;
  completed: boolean;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  subtasks: ISubTask[];
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
  boards: IBoard[];
  setBoards: (newState: IBoard[]) => void;
}

const INITIAL_BOARDS_VALUE: IContext = {
  boards: [
    {
      id: crypto.randomUUID(),
      name: "Welcome!",
      columns: [],
      active: false,
    },
  ],
  setBoards: () => {},
};

export const BoardsContext = createContext<IContext>(INITIAL_BOARDS_VALUE);

const BoardsProvider = ({ children }: { children: React.ReactNode }) => {
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
        boards,
        setBoards,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

export default BoardsProvider;
