import styled from "styled-components";

export const Button = styled.button`
  text-align: center;
  background: #edf895;
  border-radius: 14px;
  width: 100px;
  height: 40px;
  border-color: #adadad;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ffcc00;
  }

  &:focus {
    outline: none;
  }
`;
