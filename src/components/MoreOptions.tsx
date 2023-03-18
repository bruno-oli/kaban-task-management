import React, { RefObject, useContext, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BoardsContext } from "../contexts/BoardsContext";
import { EditBoardContext } from "../contexts/EditBoardContext";
import useActiveBoard from "../hooks/useActiveBoard";
import DeleteBoard from "./dialogs/DeleteBoard";
import EditBoard from "./dialogs/EditBoard";

const Wrapper = styled.div`
  position: absolute;
  bottom: -100px;
  right: 0;
  background-color: ${(props) => props.theme.colors.elementBackground};
  width: 192px;
  height: 94px;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  visibility: hidden;
  opacity: 0;
  transition: 0.2s ease-out;
  box-shadow: 0px 4px 6px ${(props) => props.theme.colors.boxShadowColor};
  &.active {
    visibility: visible;
    opacity: 1;
  }
  button {
    cursor: pointer;
    width: 100%;
    text-align: left;
    background: none;
    outline: none;
    border: none;
    font-size: ${(props) => props.theme.fontSizes.bodyL};
    color: ${(props) => props.theme.colors.alternativeTextColor};
    font-weight: bold;
    &.delete {
      color: ${(props) => props.theme.colors.deleteColor};
    }
  }
`;

const MoreOptions = ({ refProp }: { refProp: RefObject<HTMLDivElement> }) => {
  const refDialogDelete = useRef<HTMLDialogElement>(null);

  const { isOpen, setIsOpen, refEditBoard } = useContext(EditBoardContext);
  return (
    <Wrapper ref={refProp}>
      <DeleteBoard refDialogDelete={refDialogDelete} />
      {isOpen && <EditBoard refProp={refEditBoard} />}

      <button
        onClick={() => {
          refProp.current?.classList.toggle("active");
          setIsOpen(true);
        }}
      >
        Edit Board
      </button>
      <button
        className="delete"
        onClick={() => {
          refDialogDelete.current?.showModal();
          refProp.current?.classList.toggle("active");
        }}
      >
        Delete Board
      </button>
    </Wrapper>
  );
};

export default MoreOptions;
