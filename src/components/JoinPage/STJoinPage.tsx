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
  margin-bottom: 10px;
  position: relative;

  label {
    color: #646464;
    font-size: 15px;
    margin-bottom: 8px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  min-width: 300px;
  border-radius: 5px;
  border: 1px solid #E7E7E7;
  background: #fff;
`;

export const EyeToggleButton = styled.button`
  position: absolute;
  right: 5px;
  top: 55%;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ErrorMessageJoin = styled.div`
  align-self: flex-start;
  padding-left: 18px;
  font-size: 12px;
  color: #da7969;
`;
