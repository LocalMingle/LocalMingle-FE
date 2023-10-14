import styled from "styled-components";

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

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

export const ClearIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 45%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 50px;
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const StyledInput = styled.input`
  flex-grow: 1;
  padding: 6px;
  width: 100%;
  height: 35px;
  border-radius: 6px;
  border: 1px solid gray;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const SignupText = styled.div`
  margin-top: 20px;
  font-size: 10px;
  user-select: none;

  span {
    color: #da7969;
    cursor: pointer;
    text-decoration: none;
  }
`;

export const ErrorMessageLogin = styled.div`
  font-size: 10px;
  color: #da7969;
  text-align: center;
  width: 100%;
`;
