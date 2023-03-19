import React, { createContext, useContext, useEffect, useState } from "react";
import { BoardsContext, ITask } from "./BoardsContext";
import _ from "lodash";
import useActiveBoard from "../hooks/useActiveBoard";

interface IContext {
  activeTask: ITask;
  setActiveTask: (newState: ITask) => void;
}

const INITIAL_VALUES: IContext = {
  activeTask: {
    id: "",
    description: "",
    subtasks: [],
    title: "",
    column: "",
  },
  setActiveTask: () => {},
};

export const ViewTaskContext = createContext(INITIAL_VALUES);

const ViewTaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTask, setActiveTask] = useState(INITIAL_VALUES.activeTask);
  const { setBoards, boards } = useContext(BoardsContext);
  const { activeBoard } = useActiveBoard();
  useEffect(() => {
    if (activeTask.id) {
      const clone = _.cloneDeep(boards);
      const indexBoard = boards.findIndex((i) => {
        return i.id === activeBoard?.id;
      });
      const indexColumn = boards[indexBoard].columns.findIndex((i) => {
        return i.id === activeTask.column;
      });
      const indexTask = boards[indexBoard].columns[indexColumn].tasks.findIndex(
        (i) => {
          return i.id === activeTask.id;
        }
      );
      clone[indexBoard].columns[indexColumn].tasks[indexTask] = activeTask;
      setBoards(clone);
    }
  }, [activeTask]);
  return (
    <ViewTaskContext.Provider value={{ activeTask, setActiveTask }}>
      {children}
    </ViewTaskContext.Provider>
  );
};

export default ViewTaskProvider;
