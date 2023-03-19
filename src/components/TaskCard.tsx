import React, { RefObject, useContext, useRef } from "react";
import styled from "styled-components";
import { ITask } from "../contexts/BoardsContext";
import { ViewTaskContext } from "../contexts/ViewTaskContext";

const Wrapper = styled.div`
  cursor: pointer;
  width: 100%;
  min-height: 80px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.elementBackground};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 16px;
  gap: 8px;
  box-shadow: 0px 4px 6px ${(props) => props.theme.colors.boxShadowColor};
  h2 {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${(props) => props.theme.fontSizes.headingM};
  }
  span {
    color: ${(props) => props.theme.colors.alternativeTextColor};
    font-size: ${(props) => props.theme.fontSizes.bodyM};
    font-weight: bold;
  }
  @keyframes animEnter {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: initial;
    }
  }
  animation: animEnter 0.3s forwards ease-out;
`;

const TaskCard = ({
  item,
  refProp,
}: {
  item: ITask;
  refProp: RefObject<HTMLDialogElement>;
}) => {
  function getCompletedTasksNumber() {
    let count = 0;
    item.subtasks.forEach((i) => {
      if (i.completed) {
        count += 1;
      }
    });
    return count;
  }

  const { setActiveTask } = useContext(ViewTaskContext);

  return (
    <Wrapper
      onClick={() => {
        setActiveTask(item);
        refProp.current?.showModal();
      }}
    >
      <h2>{item.title}</h2>
      {item.subtasks.length > 0 && (
        <span>
          {getCompletedTasksNumber()} of {item.subtasks.length} subtasks
        </span>
      )}
    </Wrapper>
  );
};

export default TaskCard;
