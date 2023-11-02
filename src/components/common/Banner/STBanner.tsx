import styled from "styled-components";

export const BannerSection = styled.div`
  width: 100%;
  height: 200px;
  background-color:#E6DCF0;
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;
`

export const BannerContent = styled.div`
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  & h3 {
    font-size: 20px;
    font-weight: 700;
  }

  & p {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.4;
    padding-top: 10px;
  }
`

export const EyesWrap = styled.div`
  & img:first-child {
    width: 27px;
    position: absolute;
    top: 18px;
    left: 40px;
    transform: scaleX(-1) rotate(-29.486deg);
  }

  & img:last-child {
    width: 22px;
    position: absolute;
    top: 40px;
    left: 260px;
    transform: rotate(-29.486deg);
  }

`
export const LogoWrap = styled.div`
  display: flex;

  & img:first-child {
    width: 80px;
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  & img:last-child {
    width: 100px;
    position: absolute;
    right: 110px;
    bottom: 20px;
    transform: scaleX(-1);
  }
`