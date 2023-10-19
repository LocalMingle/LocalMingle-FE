import styled from "styled-components";

export const PostSection = styled.section`
  padding-top: 50px;
`

export const SelectorWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
`

export const TitleWrap = styled.div`
  margin-bottom: 20px;

  & input {
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
  }
`

export const InputWrap = styled.div`
  margin-bottom: 30px;

  & div {
    display: flex;
    align-items: center;
    padding-bottom: 5px;

    & p {
      color: #646464;
      font-size: 15px;
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
      width: 50px;
    }
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
  }
`

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
`