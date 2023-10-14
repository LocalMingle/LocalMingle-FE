import styled from "styled-components";

export const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  position: relative;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
  }
`;

export const Input = styled.input`
  padding: 6px;
  width: 100%;
  height: 35px;
  border-radius: 6px;
  border: 1px solid gray;
`;

export const EyeToggleButton = styled.button`
  position: absolute;
  right: 6px;
  top: 69%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export const ErrorMessageJoin = styled.div`
  font-size: 10px;
  color: #da7969;
`;
