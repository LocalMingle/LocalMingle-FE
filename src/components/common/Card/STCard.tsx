import styled from "styled-components";

export const CardSection = styled.div`
  cursor: pointer;
  border: 1px solid #E7E7E7;
  background: #fff;
  border-radius: 34px;
  padding: 9px;
  margin-bottom: 20px;
` 

export const CardWrap = styled.div`
  /* min-height: 335px; */
  border: 1px solid #ADADAD;
  border-radius: 29px;
  padding: 20px;
`

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Members = styled.p`
  color: #ADADAD;
  font-size: 17px;
  font-weight: 500;
`

export const Date = styled.p`
  color: #ADADAD;
  font-size: 17px;
  padding: 15px 0;

  & span:first-child:after {
    content: "";
    display: inline-block;
    width: 2px;
    height: 15px;
    background: #ADADAD;
    margin: 0 10px;
  }
`

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-top: 5px;
  margin-bottom: 70px;
`
  
export const CardMiddle = styled.div`
  display: flex;
  align-items: center;
  
  & div {
    margin-right: 10px;
  }
`

export const CardBottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #E7E7E7;
`

export const NickName = styled.p`
  padding-left: 8px;
  font-weight: 700;
  font-size: 17px;
`