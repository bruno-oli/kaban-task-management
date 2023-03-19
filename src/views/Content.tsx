import React, { useContext, useRef } from "react";
import styled from "styled-components";
import AddNewColumnCard from "../components/AddNewColumnCard";
import Button from "../components/Button";
import ViewTask from "../components/dialogs/ViewTask";
import ShowNavbarButton from "../components/ShowNavbarButton";
import TaskCard from "../components/TaskCard";
import { NavComportamentContext } from "../contexts/NavComportamentContext";
import ViewTaskProvider from "../contexts/ViewTaskContext";
import useActiveBoard from "../hooks/useActiveBoard";

const Wrapper = styled.div`
  grid-area: content;
  max-height: 100%;
  padding: 24px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.elementBackground};
    backdrop-filter: blur(20px);
    border-radius: 0 6px 6px 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primaryColor};
    border-radius: 6px;
  }
  .no__results {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      span {
        font-family: ${(props) => props.theme.fontSizes.headingL};
        font-weight: bold;
        color: ${(props) => props.theme.colors.alternativeTextColor};
      }
    }
  }
  .coloumns {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 5%;
    .column {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      .column__details {
        display: flex;
        align-items: center;
        gap: 12px;
        .column__color {
          width: 15px;
          height: 15px;
          border-radius: 100%;
        }
      }
      .items {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }
  }
`;

const Content = () => {
  const { activeBoard } = useActiveBoard();
  const { isHideen } = useContext(NavComportamentContext);

  const refViewTask = useRef<HTMLDialogElement>(null);
  return (
    <Wrapper>
      <ViewTaskProvider>
        <ViewTask refProp={refViewTask} />
        {isHideen && <ShowNavbarButton />}
        {activeBoard?.columns.length === 0 ? (
          <div className="no__results">
            <div>
              <span>
                This board is empty. Create a new column to get started.
              </span>
              <Button type="primary" size="large" width="174px">
                + Add New Column
              </Button>
            </div>
          </div>
        ) : (
          <div className="coloumns">
            {activeBoard?.columns.map((i) => {
              return (
                <div className="column" key={i.id}>
                  <div className="column__details">
                    <div
                      className="column__color"
                      style={{ backgroundColor: `${i.color}` }}
                    ></div>
                    <span className="column__name">
                      {i.name} ({i.tasks.length})
                    </span>
                  </div>
                  <div className="items">
                    {i.tasks.map((task) => {
                      return (
                        <TaskCard
                          refProp={refViewTask}
                          key={task.id}
                          item={task}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {activeBoard?.columns.length && activeBoard.columns.length < 4 && (
              <AddNewColumnCard />
            )}
          </div>
        )}
      </ViewTaskProvider>
    </Wrapper>
  );
};

export default Content;
