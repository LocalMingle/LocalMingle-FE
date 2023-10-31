import styled from "styled-components";

export const HeaderWrap = styled.div`
  padding: 20px 0 6px;
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
`
