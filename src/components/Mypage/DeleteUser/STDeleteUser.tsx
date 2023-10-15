import styled from "styled-components";

export const Input = styled.input`
  width: 250px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 5px;
  &:focus {
    border-color: #75e1a3;
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:focus {
    border-color: #75e1a3;
    outline: none;
  }
`;
