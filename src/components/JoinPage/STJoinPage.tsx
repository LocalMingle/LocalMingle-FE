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
    border: 1px solid #e7e7e7;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    font-size: 12px;
  }
`;

export const EyleToggleWrap = styled.div`
  position: relative;
`;

export const EyeToggleButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #adadad;
  cursor: pointer;
`;

export const ErrorMessageJoin = styled.div`
  font-size: 12px;
  color: #da7969;
  text-align: left;
  margin-top: 5px;
  margin-left: 5px;
`;

export const DupCheckButtonWrap = styled.div`
  border: 1px solid #e7e7e7;
  padding: 2px;
  margin-left: 5px;
  border-radius: 23px;
`;

export const DupCheckButton = styled.button`
  border: 1px solid #adadad;
  border-radius: 20px;
  background-color: #646464;
  cursor: pointer;
  font-size: 12px;
  padding: 6px;
  color: #ffffff;
`;

export const ValidationColor = styled.div<{ isValid: boolean | null }>`
  color: ${(props) =>
    props.isValid === null ? "gray" : props.isValid ? "#14be1d" : "#da7969"};
  font-size: 12px;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
`;

export const CountdownText = styled.span`
  font-size: 12px;
  color: #da7969;
  text-align: center;
  margin-left: 200px;
  margin-top: -12px;
`;

export const EmailCodeConfirmBtn = styled.button`
  border: 1px solid #adadad;
  border-radius: 15px;
  background-color: #646464;
  cursor: pointer;
  font-size: 12px;
  padding: 6px;
  color: #ffffff;
  margin-left: 6px;
`;

export const EmailCodeConfirmInput = styled.input`
  margin-left: 10px;
  width: 20px;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;

  & img:first-child {
    width: 160px;
    cursor: pointer;
  }

  & img:last-child {
    width: 210px;
    cursor: pointer;
  }
`;

export const Language = styled.div`
  position: absolute;
  top: 25px;
  right: 20px;

  & button {
    border: none;
    background-color: transparent;
  }
  & img {
    display: block;
    width: 35px;
    cursor: pointer;
  }
`;
