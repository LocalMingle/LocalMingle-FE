import styled from "styled-components";

export const DeleteUserContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const DeleteUserWrap = styled.div`
  align-self: flex-start;
  width: 100%;

  &:first-child {
    margin-bottom: 30px;
  }

  & > p {
    color: #646464;
    font-size: 15px;
    margin-bottom: 10px;
  }

  & input {
    width: 100%;
    border: 1px solid #e7e7e7;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
  }

  & > div {
    border-radius: 34px;
    border: 1px solid #e7e7e7;
    background: #fff;
    padding: 5px;
    margin-bottom: 30px;
  }

  & textarea {
    border-radius: 29px;
    border: 1px solid #adadad;
    resize: none;
    min-height: 335px;
    width: 330px;
    width: 100%;
    padding: 15px;
  }
`;
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
