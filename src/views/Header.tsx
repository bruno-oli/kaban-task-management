import React, { useContext, useRef } from "react";
import styled, { ThemeContext } from "styled-components";

// * images
import logoLight from "../assets/logoLight.svg";
import logoDark from "../assets/logoDark.svg";
import { ThemeAppContext } from "../contexts/ThemeAppContext";
import iconVerticalElipsis from "../assets/icon-vertical-ellipsis.svg";
import Button from "../components/Button";
import useActiveBoard from "../hooks/useActiveBoard";
import MoreOptions from "../components/MoreOptions";
import InputNewTask from "../components/dialogs/InputNewTask";
import { toast } from "react-toastify";
import EditBoard from "../components/dialogs/EditBoard";
import EditBoardProvider from "../contexts/EditBoardContext";

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  grid-area: header;
  background-color: ${(props) => props.theme.colors.elementBackground};
  .logo__container {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 34px;
    border-right: solid 1px ${(props) => props.theme.colors.borderColor};
  }
  .content {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    border-bottom: solid 1px ${(props) => props.theme.colors.borderColor};
    h1 {
      font-size: ${(props) => props.theme.fontSizes.headingX};
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > div {
      display: flex;
      gap: 24px;
      align-items: center;
      position: relative;
      img {
        padding: 0 6px;
        cursor: pointer;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .logo__container {
      min-width: 40%;
    }
    .content {
      min-width: 60%;
    }
  }
`;

const Header = () => {
  const { isDarkTheme } = useContext(ThemeAppContext);
  const { activeBoard } = useActiveBoard();
  const refMoreOptions = useRef<HTMLDivElement>(null);
  const refAddNewTask = useRef<HTMLDialogElement>(null);

  return (
    <EditBoardProvider>
      <Wrapper>
        <InputNewTask refProp={refAddNewTask} />
        <div className="logo__container">
          <img src={isDarkTheme ? logoLight : logoDark} alt="logo" />
        </div>
        <div className="content">
          <h1>{activeBoard?.name}</h1>
          <div>
            <Button
              type="primary"
              size="large"
              width="164px"
              onClick={() => {
                if (
                  activeBoard?.columns.length &&
                  activeBoard?.columns.length > 0
                ) {
                  refAddNewTask.current?.showModal();
                } else {
                  toast.error(
                    "You need to have at least one column to add a task!",
                    {
                      className: "notification__box",
                    }
                  );
                }
              }}
            >
              + Add New Task
            </Button>
            <img
              src={iconVerticalElipsis}
              alt=""
              onClick={() => refMoreOptions.current?.classList.toggle("active")}
            />
            <MoreOptions refProp={refMoreOptions} />
          </div>
        </div>
      </Wrapper>
    </EditBoardProvider>
  );
};

export default Header;
