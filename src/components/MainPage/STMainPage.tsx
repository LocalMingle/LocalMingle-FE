import styled from "styled-components";

export const SelectorWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
`

export const NoContents = styled.p`
  border: 1px solid #E7E7E7;  
  background: #fff;
  border-radius: 34px;
  padding: 9px;
  margin-bottom: 20px;
  text-align: center;

  & p {
    border: 1px solid #ADADAD;
    border-radius: 29px;
    padding: 20px;
  }
`

// SeacthBar
export const SearchBar = styled.div`
  background: #fff;
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

    & p {
      cursor: pointer;
    }
  }
`

export const SearchInput = styled.input`
  font-size: 15px;
  width:100%;
  border: none;
`
