import React, { RefObject, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ISubTask } from "../../contexts/BoardsContext";
import useActiveBoard from "../../hooks/useActiveBoard";
import BaseDialogStyle from "../../styles/base/BaseDialogStyle";
import Button from "../Button";
import { BoardsContext } from "../../contexts/BoardsContext";
import { transparentize } from "polished";

import iconCross from "../../assets/icon-cross.svg";
import { toast } from "react-toastify";

const Wrapper = styled(BaseDialogStyle)`
  width: 480px;
  .contentDialog {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .titleBox {
      margin-bottom: 24px;
    }
    .descriptionBox {
      width: 100%;
      textarea {
        width: 100%;
        height: 112px;
        outline: none;
        border: solid 1px ${(props) => props.theme.colors.borderColor};
        border-radius: 4px;
        background: none;
        padding: 16px;
        resize: none;
        margin-bottom: 24px;
        color: ${(props) => props.theme.colors.textColor};
        &:focus {
          border-color: ${(props) => props.theme.colors.primaryColor};
        }
        &::placeholder {
          opacity: 0.25;
          font-weight: bold;
        }
      }
    }
    .subtasks {
      margin-bottom: 24px;
      .items {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 16px;
        .item {
          display: flex;
          align-items: center;
          gap: 16px;
          img {
            cursor: pointer;
          }
        }
      }
    }
    .status {
      margin-bottom: 24px;
      select {
        width: 100%;
        height: 40px;
        outline: none;
        border: solid 1px ${(props) => props.theme.colors.borderColor};
        padding: 0 16px;
        border-radius: 4px;
        background: transparent;
        color: ${(props) => props.theme.colors.textColor};
        font-size: ${(props) => props.theme.fontSizes.bodyL};

        &:hover {
          border-color: ${(props) => props.theme.colors.primaryColor};
          background-color: ${(props) =>
            transparentize(0.2, props.theme.colors.primaryColor)};
        }
        option {
          color: ${(props) => props.theme.colors.textColor};
          font-size: ${(props) => props.theme.fontSizes.bodyL};
        }
      }
    }
  }
`;

const InputNewTask = ({
  refProp,
}: {
  refProp: RefObject<HTMLDialogElement>;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subTasks, setSubTasks] = useState<ISubTask[]>([
    {
      id: crypto.randomUUID(),
      name: "Example",
      completed: false,
    },
  ]);
  const { activeBoard } = useActiveBoard();
  const { boards, setBoards } = useContext(BoardsContext);

  const [status, setStatus] = useState<string>("unselected");

  function removeSubTask(id: string) {
    const subTasksClone = [...subTasks];
    const removedSubTask = subTasksClone.find((i) => {
      return i.id === id;
    });
    setSubTasks(
      subTasksClone.filter((i) => {
        return i.id !== id;
      })
    );
    toast.success(
      `Sub task "${removedSubTask?.name}" has been successfully removed!`,
      {
        className: "notification__box",
      }
    );
  }

  function addNewSubTask() {
    if (subTasks.length >= 3) {
      toast.error(
        "This task has already reached the maximum number of sub tasks!",
        {
          className: "notification__box",
        }
      );
    } else {
      setSubTasks([
        ...subTasks,
        {
          id: crypto.randomUUID(),
          completed: false,
          name: "",
        },
      ]);
    }
  }

  function addNewTask() {
    const boardsClone = [...boards];
    function verifySubTasksNameLength() {
      let error = false;
      if (subTasks.length === 0) {
        error = false;
      } else {
        subTasks.forEach((i) => {
          if (i.name.length < 4) {
            error = true;
          }
        });
      }
      return error;
    }
    if (title.length < 4) {
      toast.error("Task name must have at least four letters!", {
        className: "notification__box",
      });
    } else if (description.length < 10) {
      toast.error("Task description must have at least ten letters!", {
        className: "notification__box",
      });
    } else if (verifySubTasksNameLength()) {
      toast.error("Sub Task's name must have at least four letters!", {
        className: "notification__box",
      });
    } else if (status === "unselected") {
      toast.error("You need to select a status!", {
        className: "notification__box",
      });
    } else {
      const boardIndex = boardsClone.findIndex((i) => {
        return i.id === activeBoard?.id;
      });
      const columnIndex = boardsClone[boardIndex].columns.findIndex((i) => {
        return i.id === status;
      });
      boardsClone[boardIndex].columns[columnIndex].tasks = [
        ...boardsClone[boardIndex].columns[columnIndex].tasks,
        {
          id: crypto.randomUUID(),
          title,
          description,
          subtasks: subTasks,
        },
      ];
      setBoards(boardsClone);
      toast.success(`The task: "${title}" was adds success to the column.`, {
        className: "notification__box",
      });
      refProp.current?.close();
    }
  }

  return (
    <Wrapper ref={refProp}>
      <div className="contentDialog">
        <h1>Add New Task</h1>
        <div className="titleBox">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="e.g. Take coffe break"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="descriptionBox">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="subtasks">
          <label>Subtasks</label>
          <div className="items">
            {subTasks.map((i, index) => {
              return (
                <div className="item" key={i.id}>
                  <input
                    type="text"
                    placeholder="e.g. Make coffee"
                    value={i.name}
                    onChange={(e) => {
                      const stateClone = [...subTasks];
                      stateClone[index].name = e.target.value;
                      setSubTasks(stateClone);
                    }}
                  />
                  <img
                    src={iconCross}
                    alt="delete subtask"
                    onClick={() => removeSubTask(i.id)}
                  />
                </div>
              );
            })}
          </div>
          <Button
            size="small"
            type="secondary"
            width="100%"
            onClick={addNewSubTask}
          >
            + Add New Subtask
          </Button>
        </div>
        <div className="status">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="unselected">Select a status</option>
            {activeBoard?.columns.map((i) => {
              return (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              );
            })}
          </select>
        </div>
        <Button size="small" width="100%" type="primary" onClick={addNewTask}>
          Create Task
        </Button>
      </div>
    </Wrapper>
  );
};

export default InputNewTask;
