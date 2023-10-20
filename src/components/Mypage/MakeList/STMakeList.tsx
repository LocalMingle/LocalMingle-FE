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

export const UserPostForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  label {
    flex: 1;
    font-size: 12px;
    font-weight: 500;
    color: #333;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    max-width: 70%;
  }

  > div:last-child {
    display: flex;
    align-items: center;

    button {
      margin-left: 10px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;

      svg {
        fill: #777;
        width: 20px;
        height: 20px;
        &:hover {
          fill: #333;
        }
      }
    }
  }
`;
