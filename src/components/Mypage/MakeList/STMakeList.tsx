import styled from "styled-components";

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

export const NoEventMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #888;
  margin-top: 20px;
  user-select: none;
`;
