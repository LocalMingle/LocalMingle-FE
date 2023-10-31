import styled from "styled-components";

interface ButtonProps {
  bgcolor?: string;
}

export const ButtonWrap = styled.div`
  border-radius: 23px;
  border: 1px solid #e7e7e7;
  background: #fff;
  padding: 3px;
  cursor: pointer;
`;

export const Button = styled.button<ButtonProps>`
  background: ${({ bgcolor }) => bgcolor || "#edf895"};
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid #adadad;
  color: #646464;
  text-align: center;
  height: 40px;
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 120px;

  &:focus {
    outline: none;
  }
`;
