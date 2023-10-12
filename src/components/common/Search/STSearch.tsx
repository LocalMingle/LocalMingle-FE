import styled, { css } from "styled-components";

export const SearchBar = styled.div`
  border: 1px solid #E7E7E7;
  border-radius: 18px;
  padding: 3px;
  width: 100%;
  margin-bottom: 10px;

  & div {
    border: 1px solid #ADADAD;
    border-radius: 15px;
    padding: 4px 16px 4px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }
`

export const SearchInput = styled.input`
  font-size: 15px;
  width:100%;
  border: none;
`