import styled from "styled-components";

export const ButtonWrap = styled.div`
  border-radius: 23px;
  border: 1px solid #e7e7e7;
  background: #fff;
  padding: 3px;
`;

export const Button = styled.button`
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #adadad;
  background: #edf895;
  color: #646464;
  text-align: center;
  height: 45px;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 120px;

  &:focus {
    outline: none;
  }
`;
