import { RefObject, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import iconCross from "../../assets/icon-cross.svg";
import {
  BoardsContext,
  INITIAL_BOARDS_VALUE,
} from "../../contexts/BoardsContext";
import getRandomColor from "../../functions/getRandomColor";
import Button from "../Button";

const Wrapper = styled.dialog`
  width: 480px;
  min-height: 429px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.elementBackground};
  border: none;
  top: calc((100% - 429px) / 2);
  left: calc((100% - 480px) / 2);
  z-index: 2;
  padding: 32px;
  &::backdrop {
    opacity: 1;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    h1 {
      font-size: ${(props) => props.theme.fontSizes.headingL};
      font-weight: bold;
      margin-bottom: 24px;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 24px;
      .board__name {
        width: 100%;
        margin-bottom: 24px;
        label {
          font-size: ${(props) => props.theme.fontSizes.headingS};
          display: block;
          font-weight: bold;
          margin-bottom: 8px;
        }
        input {
          width: 100%;
          height: 40px;
          outline: none;
          border: solid 1px ${(props) => props.theme.colors.borderColor};
          border-radius: 4px;
          background: none;
          padding-left: 16px;
          &::placeholder {
            opacity: 0.25;
            font-weight: bold;
          }
        }
      }
      .board__columns {
        width: 100%;
        span {
          font-size: ${(props) => props.theme.fontSizes.headingS};
          display: block;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .columns {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 12px;
          .column {
            height: 40px;
            div {
              flex: 1;
              height: 100%;
              border: solid 1px ${(props) => props.theme.colors.borderColor};
              border-radius: 4px;
              display: flex;
              align-items: center;
              padding: 0 16px;
              input {
                width: 100%;
                font-size: ${(props) => props.theme.fontSizes.bodyL};
                background: none;
                border: none;
                outline: none;
              }
            }
            img {
              cursor: pointer;
            }
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }
        }
      }
    }
  }
`;

const InputNewBoard = ({
  refProp,
}: {
  refProp: RefObject<HTMLDialogElement>;
}) => {
  // * Using Contex
  const { boards, setBoards } = useContext(BoardsContext);

  // * Board Infos
  const [name, setName] = useState("");

  const [columns, setColumns] = useState([
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
  ]);

  function addNewColumn() {
    if (columns.length >= 4) {
      toast.error(
        "This board has already reached the maximum number of columns!",
        {
          className: "notification__box",
        }
      );
    } else {
      setColumns([
        ...columns,
        {
          id: crypto.randomUUID(),
          name: "",
          tasks: [],
          color: getRandomColor(),
        },
      ]);
    }
  }

  function removeColumn(id: string) {
    const columnsClone = [...columns];
    const removedColum = columnsClone.find((i) => {
      return i.id === id;
    });
    setColumns(
      columnsClone.filter((i) => {
        return i.id !== id;
      })
    );
    toast.success(
      `Column "${removedColum?.name}" has been successfully removed!`,
      {
        className: "notification__box",
      }
    );
  }

  function addNewBoard() {
    if (name.length < 4) {
      toast.error("The board name must be at least four characters long!", {
        className: "notification__box",
      });
    } else if (
      boards.find((i) => {
        return i.name === name;
      })
    ) {
      toast.error("This name is already being used!", {
        className: "notification__box",
      });
    } else {
      setBoards([
        ...boards,
        {
          id: crypto.randomUUID(),
          name,
          columns,
          active: false,
        },
      ]);
      setColumns([
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
      ]);
      setName("");
      refProp.current?.close();
      toast.success(`Board "${name}" was successfully created!`, {
        className: "notification__box",
      });
    }
  }

  return (
    <Wrapper ref={refProp}>
      <div className="content">
        <h1>Add New Board</h1>
        <form>
          <div className="board__name">
            <label htmlFor="boardName">Board Name</label>
            <input
              type="text"
              id="boardName"
              placeholder="e.g. Web Designer"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="board__columns">
            <span>Board Columns</span>
            <div className="columns">
              {columns.map((i, index) => {
                return (
                  <div className="column" key={i.id}>
                    <div>
                      <input
                        type="text"
                        value={i.name}
                        onChange={(e) => {
                          const stateClone = [...columns];
                          stateClone[index].name = e.target.value;
                          setColumns(stateClone);
                        }}
                      />
                    </div>
                    <img
                      src={iconCross}
                      alt="delete"
                      onClick={() => removeColumn(i.id)}
                    />
                  </div>
                );
              })}
            </div>
            <Button
              size="small"
              type="secondary"
              width="100%"
              onClick={addNewColumn}
            >
              + Add New Column
            </Button>
          </div>
        </form>
        <Button size="small" type="primary" width="100%" onClick={addNewBoard}>
          Create New Board
        </Button>
      </div>
    </Wrapper>
  );
};

export default InputNewBoard;
