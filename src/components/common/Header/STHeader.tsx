import styled, { css } from "styled-components";

export const HeaderWrap = styled.div`
  padding: 20px 0 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
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
`

export const HeaderBtns = styled.div`
  & button:first-child {
    margin-right: 10px;
  }
`