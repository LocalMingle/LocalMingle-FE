import styled, { css } from "styled-components";

interface TagProps {
  bgColor?: string;
}

export const TagWrap = styled.div`
  border: 1px solid #E7E7E7;
  border-radius: 15px;
  padding: 3px;
  width: 120px;
`

export const Tag = styled.p<TagProps>`
  text-align: center;
  border: 1px solid #131313;
  border-radius: 12px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  font-weight: 500;
  
  ${(props)=>
    props.bgColor === "green" &&
  css`
    background: #58DF97;
  `}

  ${(props)=>
    props.bgColor === "orange" &&
  css`
    background: #E48668;
  `}

  ${(props)=>
    props.bgColor === "pink" &&
  css`
    background: #F19FC4;
  `}
`