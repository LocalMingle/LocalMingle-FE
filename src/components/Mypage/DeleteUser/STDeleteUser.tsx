import styled from "styled-components";

export const MyPageContainer = styled.div`
  position: relative;
  z-index: 10;
  top: -6px;
  border: 1px solid #e7e7e7;
  border-radius: 34px;
  padding: 5px;
  background: #fff;
`;

export const MyPageWrap = styled.div`
  background: #fff;
  width: 100%;
  border: 1px solid #adadad;
  border-radius: 29px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorMessage = styled.div<{ isValid?: boolean | null }>`
  font-size: 12px;
  color: ${({ isValid }) =>
    isValid ? "#3ed643" : isValid === null ? "#e4381e" : "#da7969"};
  text-align: left;
  margin-top: 5px;
`;

export const DeleteUserWrap = styled.div`
  align-self: flex-start;
  width: 100%;
  margin-top: 20px;

  &:first-child {
    margin-bottom: 10px;
  }

  & > p {
    color: #646464;
    font-size: 15px;
    margin-bottom: 10px;
  }
`;

export const InputWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;

  & > input {
    width: 100%;
    border: 1px solid #e7e7e7;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
  }

  & > ${ErrorMessage} {
    position: absolute;
    top: 100%;
    left: 0;
  }
`

export const TextareaWrap = styled.div`
    border-radius: 34px;
    border: 1px solid #e7e7e7;
    background: #fff;
    padding: 5px;
    position: relative;

    & > textarea {
      border-radius: 29px;
      border: 1px solid #adadad;
      resize: none;
      min-height: 335px;
      width: 330px;
      width: 100%;
      padding: 15px;
    }

    & > ${ErrorMessage} {
      position: absolute;
      top: 100%;
      left: 0;
    }
`

export const AnimationContainer = styled.div`
  width: 300px;
  height: 300px;
  margin: auto;
  position: relative;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
