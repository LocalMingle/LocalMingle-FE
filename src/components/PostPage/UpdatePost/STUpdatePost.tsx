import styled from "styled-components";

export const PostSection = styled.section`
  padding-top: 50px;
`

export const SelectorWrap = styled.div`
  display: flex;
  gap: 10px;
`

export const TitleWrap = styled.div`
  margin: 20px 0;

  & input {
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    padding: 8px;
    width: 100%;
  }
`

export const InputWrap = styled.div`
  margin-bottom: 30px;

  & div {
    display: flex;
    align-items: center;
    font-size: 15px;
    margin-bottom: 10px;

    & p {
      color: #646464;
      width: 100px;
    }

    & span {
      display: inline-block;
      margin-left: 5px;
    }

    & input {
      border: 1px solid #E7E7E7;
      border-radius: 5px;
      padding: 4px;
    }

    & input[type="date"] {
      width: 110px;
    }

    & input[type="number"] {
      width: 70px;
    }
  }
`

export const DatePickerWrap = styled.div`
  & div {
    margin-bottom: 0;
  }

  & div:first-child {
    margin-right: 5px;
  }
`

export const ContentsWrap = styled.div`
  border: 1px solid #E7E7E7;
  border-radius: 26px;
  background: #fff;
  margin-bottom: 30px;
  padding: 3px;
  width: 100%;
  min-height: 300px;

  & textarea {
    border-radius: 22px;
    border: 1px solid #ADADAD;
    background: #FFF;
    width: 100%;
    min-height: 300px;
    padding: 10px 15px;
    resize: none;
    overflow-y: auto;
    font-size: 15px;
  }
`

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap : 30px;
`
