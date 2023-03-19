import { RefObject, useContext } from "react";
import styled from "styled-components";
import { ViewTaskContext } from "../../contexts/ViewTaskContext";
import BaseDialogStyle from "../../styles/base/BaseDialogStyle";
import iconVerticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import useActiveBoard from "../../hooks/useActiveBoard";

import _ from "lodash";
import { BoardsContext } from "../../contexts/BoardsContext";

const Wrapper = styled(BaseDialogStyle)`
  width: 480px;
  .contentDialog {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
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
      background: none;
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
          <img src={iconVerticalEllipsis} alt="more options" />
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
