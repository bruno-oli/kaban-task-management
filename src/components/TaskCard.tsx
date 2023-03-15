import React from "react";
import styled from "styled-components";
import { ITask } from "../contexts/BoardsContext";

const Wrapper = styled.div`
  width: 100%;
  min-height: 80px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.elementBackground};
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TaskCard = ({ item }: { item: ITask }) => {
  return <Wrapper>{item.name}</Wrapper>;
};

export default TaskCard;
