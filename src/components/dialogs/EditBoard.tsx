import React, { RefObject, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BoardsContext, IBoard, IColumn } from "../../contexts/BoardsContext";
import { EditBoardContext } from "../../contexts/EditBoardContext";
import useActiveBoard from "../../hooks/useActiveBoard";
import BaseDialogStyle from "../../styles/base/BaseDialogStyle";
import _ from "lodash";

import iconCross from "../../assets/icon-cross.svg";
import Button from "../Button";
import getRandomColor from "../../functions/getRandomColor";
import { toast } from "react-toastify";

const Wrapper = styled(BaseDialogStyle)`
  width: 480px;
  .contentDialog {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .board__name {
      margin-bottom: 24px;
    }
    .board__columns {
      margin-bottom: 24px;
      .items {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 12px;
        .item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
      }
    }
  }
`;

const EditBoard = ({
  refProp,
}: {
  refProp: RefObject<HTMLDialogElement> | null;
}) => {
  const { setIsOpen } = useContext(EditBoardContext);
  const { boards, setBoards } = useContext(BoardsContext);
  const { activeBoard } = useActiveBoard();
  const [name, setName] = useState<string | undefined>(activeBoard?.name);
  
  const [columns, setColumns] = useState<IColumn[] | undefined>(
    _.cloneDeep(activeBoard?.columns)
  );

  function addNewColumn() {
    if (columns?.length && columns.length >= 4) {
      toast.error(
        "This board has already reached the maximum number of columns!",
        {
          className: "notification__box",
        }
      );
    } else {
      const clone = _.cloneDeep(columns);
      clone?.push({
        id: crypto.randomUUID(),
        name: "",
        color: getRandomColor(),
        tasks: [],
      });
      setColumns(clone);
    }
  }

  function saveChanges() {
    function getColumnNameLength() {
      let error = false;
      columns?.forEach((i) => {
        if (i.name.length < 4) {
          error = true;
        }
      });
      return error;
    }
    if (activeBoard && columns && name) {
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
        const newBoards = boards.map((i) => {
          if (i.id === activeBoard.id) {
            return {
              id: activeBoard.id,
              name: name,
              active: activeBoard.active,
              columns: columns,
            };
          } else {
            return i;
          }
        });
        setBoards(newBoards);
        refProp?.current?.close();
      }
    }
  }

  return (
    <Wrapper
      ref={refProp}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <div className="contentDialog">
        <h1>Edit Board</h1>
        <div className="board__name">
          <label htmlFor="boardName">Board Name</label>
          <input
            type="text"
            id="boardName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="board__columns">
          <label htmlFor="boardColumns">Board Columns</label>
          <div className="items">
            {columns?.map((i, index) => {
              return (
                <div className="item" key={i.id}>
                  <input
                    type="text"
                    value={i.name}
                    onChange={(e) => {
                      const clone: IColumn[] = _.cloneDeep(columns);
                      clone[index].name = e.target.value;
                      setColumns(clone);
                    }}
                  />
                  <img
                    src={iconCross}
                    alt="delete column"
                    onClick={() => {
                      setColumns(
                        columns.filter((column) => {
                          return column.id !== i.id;
                        })
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
          <Button
            width="100%"
            type="secondary"
            size="small"
            onClick={addNewColumn}
          >
            + Add New Column
          </Button>
        </div>
        <Button width="100%" size="small" type="primary" onClick={saveChanges}>
          Save Changes
        </Button>
      </div>
    </Wrapper>
  );
};

export default EditBoard;
