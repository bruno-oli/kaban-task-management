import { RefObject, useContext, useRef } from "react";
import styled from "styled-components";
import { ViewTaskContext } from "../../contexts/ViewTaskContext";
import BaseDialogStyle from "../../styles/base/BaseDialogStyle";
import iconVerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import useActiveBoard from "../../hooks/useActiveBoard";

import _ from "lodash";
import { BoardsContext } from "../../contexts/BoardsContext";
import { toast } from "react-toastify";

const Wrapper = styled(BaseDialogStyle)`
  width: 480px;
  .contentDialog {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      position: relative;
      h1 {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0;
      }
      img {
        cursor: pointer;
        padding: 0 5px;
      }
      .menu {
        width: 192px;
        height: 94px;
        border-radius: 8px;
        position: absolute;
        background-color: ${(props) => props.theme.colors.bodyBackground};
        box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
        right: 0px;
        bottom: -120px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 16px;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s;
        &.active {
          visibility: visible;
          opacity: 1;
        }
        button {
          cursor: pointer;
          background: none;
          outline: none;
          border: none;
          font-size: ${(props) => props.theme.fontSizes.bodyL};
          height: 50%;
          text-align: left;
          color: ${(props) => props.theme.colors.alternativeTextColor};
          &:last-child {
            color: ${(props) => props.theme.colors.deleteColor};
          }
        }
      }
    }
    p {
      word-wrap: break-word;
      font-weight: 500;
      font-size: ${(props) => props.theme.fontSizes.bodyL};
      line-height: 23px;
      color: ${(props) => props.theme.colors.alternativeTextColor};
      margin-bottom: 24px;
    }
    .subtasks {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 24px;
      .subtask {
        width: 100%;
        height: 40px;
        padding: 0 16px;
        gap: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: ${(props) => props.theme.colors.bodyBackground};
        border-radius: 4px;
        &.completed {
          span {
            font-weight: bold;
            font-size: ${(props) => props.theme.fontSizes.bodyM};
            color: ${(props) => props.theme.colors.alternativeTextColor};
            text-decoration: line-through;
          }
        }
        input {
          flex: 0;
        }
        span {
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          font-weight: bold;
          font-size: ${(props) => props.theme.fontSizes.bodyM};
        }
      }
    }
    select {
      outline: none;
      border: solid 1px ${(props) => props.theme.colors.borderColor};
      background: ${(props) => props.theme.colors.elementBackground};
      color: ${(props) => props.theme.colors.textColor};
      width: 100%;
      height: 40px;
      border-radius: 4px;
      padding: 0 16px;
    }
  }
`;

const ViewTask = ({ refProp }: { refProp: RefObject<HTMLDialogElement> }) => {
  const { activeTask, setActiveTask } = useContext(ViewTaskContext);
  const { activeBoard } = useActiveBoard();
  const { boards, setBoards } = useContext(BoardsContext);

  const refMenu = useRef<HTMLDivElement>(null);

  function deleteTask() {
    const boardIndex = boards.findIndex((i) => {
      return i.id === activeBoard?.id;
    });
    const columnIndex = boards[boardIndex].columns.findIndex((i) => {
      return i.id === activeTask.column;
    });
    const cloneBoards = _.cloneDeep(boards);
    cloneBoards[boardIndex].columns[columnIndex].tasks = cloneBoards[
      boardIndex
    ].columns[columnIndex].tasks.filter((i) => {
      return i.id !== activeTask.id;
    });
    setBoards(cloneBoards);
    refProp.current?.close();
    refMenu.current?.classList.toggle("active");
    toast.success("The task has been removed successfully!", {
      className: "notification__box",
    });
  }

  function getCompletedTasks() {
    let completed = 0;
    activeTask.subtasks.forEach((i) => {
      if (i.completed) {
        completed += 1;
      }
    });
    return completed;
  }

  return (
    <Wrapper ref={refProp}>
      <div className="contentDialog">
        <div className="header">
          <h1>{activeTask.title}</h1>
          <img
            src={iconVerticalEllipsis}
            alt="more options"
            onClick={() => refMenu.current?.classList.toggle("active")}
          />
          <div className="menu" ref={refMenu}>
            <button>Edit Task</button>
            <button onClick={deleteTask}>Delete Task</button>
          </div>
        </div>
        <p>{activeTask.description}</p>
        <label>
          Subtasks ({getCompletedTasks()} of {activeTask.subtasks.length})
        </label>
        <div className="subtasks">
          {activeTask.subtasks.map((i) => {
            return (
              <div
                className={`subtask ${i.completed ? "completed" : ""}`}
                key={i.id}
              >
                <input
                  type="checkbox"
                  checked={i.completed}
                  onChange={() => {
                    const clone = _.cloneDeep(activeTask);
                    clone.subtasks = clone.subtasks.map((subtask) => {
                      if (subtask.id === i.id) {
                        return {
                          ...subtask,
                          completed: !i.completed,
                        };
                      } else {
                        return subtask;
                      }
                    });
                    setActiveTask(clone);
                  }}
                />
                <span>{i.name}</span>
              </div>
            );
          })}
        </div>
        <label htmlFor="statusView">Current Status</label>
        <select
          id="statusView"
          onChange={(e) => {
            const cloneTask = _.cloneDeep(activeTask);
            if (
              e.target.value !== "unselected" &&
              e.target.value !== activeTask.column
            ) {
              const cloneBoards = _.cloneDeep(boards);
              const boardIndex = cloneBoards.findIndex((i) => {
                return i.id === activeBoard?.id;
              });
              const olderColumnnIndex = cloneBoards[
                boardIndex
              ].columns.findIndex((i) => {
                return i.id === activeTask.column;
              });
              const newColumnIndex = cloneBoards[boardIndex].columns.findIndex(
                (i) => {
                  return i.id === e.target.value;
                }
              );
              const filteredTasks = cloneBoards[boardIndex].columns[
                olderColumnnIndex
              ].tasks.filter((i) => {
                return i.id !== activeTask.id;
              });
              cloneBoards[boardIndex].columns[olderColumnnIndex].tasks =
                filteredTasks;
              cloneTask.column = e.target.value;
              cloneBoards[boardIndex].columns[newColumnIndex].tasks.push(
                cloneTask
              );
              setActiveTask(cloneTask);
              setBoards(cloneBoards);
            }
          }}
        >
          <option value={"unselected"}>Select one</option>
          {activeBoard?.columns.map((i) => {
            return (
              <option value={i.id} key={i.id}>
                {i.name}
              </option>
            );
          })}
        </select>
      </div>
    </Wrapper>
  );
};

export default ViewTask;
