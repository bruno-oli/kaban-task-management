import { RefObject, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import iconCross from "../../assets/icon-cross.svg";
import { BoardsContext } from "../../contexts/BoardsContext";
import getRandomColor from "../../functions/getRandomColor";
import BaseDialogStyle from "../../styles/base/BaseDialogStyle";
import Button from "../Button";

const Wrapper = styled(BaseDialogStyle)`
  width: 480px;
  min-height: 429px;
  .contentDialog {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 24px;
      .board__name {
        width: 100%;
        margin-bottom: 24px;
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
    function getColumnNameLength() {
      let error = false;
      columns.forEach((i) => {
        if (i.name.length < 4) {
          error = true;
        }
      });
      return error;
    }
    if (getColumnNameLength()) {
      toast.error("The columns name must be at least four characters long!", {
        className: "notification__box",
      });
    } else if (name.length < 4) {
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
          name: name,
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
      <div className="contentDialog">
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
