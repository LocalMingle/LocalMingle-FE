import styled from "styled-components";

export const HeaderWrap = styled.div`
  padding: 20px 0 10px;
  display: flex;
  justify-content: space-between;

  & img {
    width: 125px;
    cursor: pointer;
  }

  & button {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    font-size: 12px;
    font-weight: 700;
    color: #131313;
  }
`;

export const HeaderBtns = styled.div`
  display: flex;

  & button:not(:last-child) {
    margin-right: 10px;
  }
`;

// 언어선택 버튼
export const Language = styled.div`
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

export const UserLogo = styled.div`
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    margin-right: 7px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  color: #1f1f1f;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 10px;
  z-index: 1000;
  font-size: 16px;
  margin-top: 5px;
  width: 90px;
  height: 60px;
  right: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DropdownButton = styled.button`
  background: none;
  color: #1f1f1f;
  border: none;
  margin: 2px 2px 2px 0px;
  width: 100%;
  text-align: center;
  line-height: 1.5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MyPageButton = styled.button`
  background: none;
  color: #1f1f1f;
  border: none;
  margin: 5px 2px 4px 10px;
  width: 100%;
  text-align: center;
  line-height: 1.5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
