import React, { RefObject, useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BoardsContext } from "../../contexts/BoardsContext";
import useActiveBoard from "../../hooks/useActiveBoard";
import BaseDialogStyle from "../../styles/base/BaseDialogStyle";
import Button from "../Button";

const Wrapper = styled(BaseDialogStyle)`
  width: 480px;
  height: 229px;
  .contentDialog {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
      color: ${(props) => props.theme.colors.deleteColor};
      font-size: ${(props) => props.theme.fontSizes.headingL};
      margin-bottom: 0;
    }
    p {
      font-size: ${(props) => props.theme.fontSizes.bodyL};
      line-height: 23px;
      color: ${(props) => props.theme.colors.alternativeTextColor};
    }
    .options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }
  }
`;

const DeleteBoard = ({
  refDialogDelete,
}: {
  refDialogDelete: RefObject<HTMLDialogElement>;
}) => {
  const { boards, setBoards } = useContext(BoardsContext);
  const { activeBoard, setActiveBoard } = useActiveBoard();
  function removeBoard() {
    if (boards.length > 1) {
      const index = boards.findIndex((i) => {
        return i.id === activeBoard?.id;
      });
      if (index === 0) {
        setActiveBoard(boards[index + 1].id);
      } else {
        setActiveBoard(boards[0].id);
      }
      setBoards(
        boards.filter((i) => {
          return i.id !== activeBoard?.id;
        })
      );
      toast.success("The board has been successfully removed!", {
        className: "notification__box",
      });
      refDialogDelete.current?.close();
    } else {
      toast.error("You need to have at least one board!", {
        className: "notification__box",
      });
      refDialogDelete.current?.close();
    }
  }
  return (
    <Wrapper ref={refDialogDelete}>
      <div className="contentDialog">
        <h1>Delete this board?</h1>
        <p>
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="options">
          <Button
            size="small"
            type="destructive"
            width="50%"
            onClick={removeBoard}
          >
            Delete
          </Button>
          <Button
            size="small"
            type="secondary"
            width="50%"
            onClick={() => refDialogDelete.current?.close()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default DeleteBoard;
