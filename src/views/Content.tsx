import React, { useContext } from "react";
import styled from "styled-components";
import AddNewColumnCard from "../components/AddNewColumnCard";
import Button from "../components/Button";
import ShowNavbarButton from "../components/ShowNavbarButton";
import TaskCard from "../components/TaskCard";
import { NavComportamentContext } from "../contexts/NavComportamentContext";
import useActiveBoard from "../hooks/useActiveBoard";

const Wrapper = styled.div`
  grid-area: content;
  padding: 24px;
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
  return (
    <Wrapper>
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
                  <span>
                    {i.name} ({i.tasks.length})
                  </span>
                </div>
                <div className="items">
                  {i.tasks.map((task) => {
                    return <TaskCard item={task} />;
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
    </Wrapper>
  );
};

export default Content;
