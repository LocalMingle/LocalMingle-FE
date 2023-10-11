import styled, {css} from "styled-components";

export const BannerSection = styled.div`
  width: 100%;
  height: 200px;
  background-color:#E6DCF0;
  border-radius: 10px;
`

export const BannerContent = styled.div`
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  & h3 {
    font-size: 20px;
    font-weight: 600;
    padding-bottom:14px;
  }

  & p {
    font-size: 15px;
    font-weight: 400;
  }
`