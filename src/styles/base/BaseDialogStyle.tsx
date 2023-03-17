import styled from "styled-components";

const BaseDialogStyle = styled.dialog`
  border: none;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 6px;
  z-index: 2;
  padding: 32px;
  z-index: 2;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.elementBackground};
    backdrop-filter: blur(20px);
    border-radius: 0 6px 6px 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.primaryColor};
    border-radius: 6px;
  }
  &::backdrop {
    opacity: 1;
  }
  background-color: ${(props) => props.theme.colors.elementBackground};
  h1 {
    font-size: ${(props) => props.theme.fontSizes.headingL};
    font-weight: bold;
    margin-bottom: 24px;
    text-transform: capitalize;
  }
  label {
    font-size: ${(props) => props.theme.fontSizes.headingS};
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    height: 40px;
    outline: none;
    border: solid 1px ${(props) => props.theme.colors.borderColor};
    border-radius: 4px;
    background: none;
    padding: 0 16px;
    &:focus {
      border-color: ${(props) => props.theme.colors.primaryColor};
    }
    &::placeholder {
      opacity: 0.25;
      font-weight: bold;
    }
  }
`;

export default BaseDialogStyle;
