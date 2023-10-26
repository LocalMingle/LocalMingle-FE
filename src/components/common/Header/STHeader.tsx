import styled from "styled-components";

export const HeaderWrap = styled.div`
  padding: 20px 0 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & img {
    width: 150px;
    cursor: pointer;
  }

  & button {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    font-size: 15px;
    font-weight: 700;
  }
`;

export const HeaderBtns = styled.div`
  & button:not(:last-child) {
    margin-right: 10px;
  }
`;
