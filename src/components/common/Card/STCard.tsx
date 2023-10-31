import styled from "styled-components";

export const CardSection = styled.div`
  cursor: pointer;
  border: 1px solid #E7E7E7;
  background: #fff;
  border-radius: 34px;
  padding: 9px;
  margin-bottom: 20px;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
` 

export const CardWrap = styled.div`
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
  gap: 5px;
`

export const CardBottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #E7E7E7;
`

export const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #292D32;
`

export const NickName = styled.p`
  padding-left: 8px;
  font-weight: 700;
  font-size: 17px;
`