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
  margin-bottom: 20px;
  width: 100%;

  & label {
    color: #646464;
    font-size: 15px;
    margin-bottom: 8px;
  }

  & div {
    display: flex;
    align-items: center;

    & input {
      flex-grow: 1;
    }
  }

  & input {
    border: 1px solid #E7E7E7;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    font-size: 12px;
  }
`;

export const EyleToggleWrap = styled.div`
  position: relative;
`

export const EyeToggleButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export const ErrorMessageJoin = styled.div`
  font-size: 12px;
  color: #da7969;
  text-align: left;
  margin-top: 5px;
`;

export const DupCheckButtonWrap = styled.div`
  border: 1px solid #E7E7E7;
  padding: 2px;
  margin-left: 5px;
  border-radius: 23px;
`

export const DupCheckButton = styled.button`
  border: 1px solid #ADADAD;
  border-radius: 20px;
  background-color: #F7D16F;
  cursor: pointer;
  font-size: 12px;
  padding: 5px;
  color: #646464;
`;
