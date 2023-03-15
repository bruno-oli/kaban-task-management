import React, { useContext } from "react";
import styled from "styled-components";

//images
import iconShowSidebar from "../assets/icon-show-sidebar.svg";
import { NavComportamentContext } from "../contexts/NavComportamentContext";

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 56px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.primaryColor};
  border-radius: 0px 100px 100px 0px;
  @keyframes animEnter {
    0% {
      left: -200px;
    }
    100% {
      left: 0;
    }
  }
  animation: 0.6s animEnter forwards ease-out;
`;

const ShowNavbarButton = () => {
  const { setIsHideen, isHideen } = useContext(NavComportamentContext);
  return (
    <Wrapper onClick={() => setIsHideen(!isHideen)}>
      <img src={iconShowSidebar} alt="" />
    </Wrapper>
  );
};

export default ShowNavbarButton;
