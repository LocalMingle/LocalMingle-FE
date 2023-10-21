import styled from "styled-components";

export const MyPageContainer = styled.div`
  position: relative;
  z-index: 10;
  top: -6px;
  border: 1px solid #e7e7e7;
  border-radius: 34px;
  padding: 5px;
  background: #fff;
  min-height: 630px;
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
  min-height: 630px;
  max-height: 630px;

  & > div {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
`;

export const UserPostForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding: 15px 8px;
  border-radius: 4px;
  border: 1px solid #E7E7E7;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #f5f5f5;
  }

  h2 {
    font-size: 14px;
    font-weight: 600;
    color: #000;
    width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.5;
  }
`;

export const UserPostButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > button {
    font-size: 12px;
    border: 1px solid #ADADAD;
    border-radius: 15px;
    padding: 4px 8px;
    cursor: pointer;

    &:first-child {
      background: #E7E7E7;
      color: #646464;
    }

    &:last-child {
      background: #FF5733;
      color: #fff;
    }
  }
`;

export const NoEventMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #646464;
  margin-top: 20px;
  user-select: none;
`;
