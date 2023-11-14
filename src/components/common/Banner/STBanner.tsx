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

export const LogoWrap = styled.div`
  display: flex;

  & img:first-child {
    width: 70px;
    position: absolute;
    right: 10px;
    bottom: 20px;
  }

  & img:last-child {
    width: 90px;
    position: absolute;
    right: 80px;
    bottom: 20px;
    transform: scaleX(-1);
  }
`

export const BannerImg = styled.div`
  /* 눈 */
  & img:nth-child(1) {
    z-index: 3;
    position: absolute;
    top: 65px;
    right: 90px;
    width: 40px;
    transform: rotate(-12.986deg);

    @media screen and (max-width: 500px){
      top: 90px;
      right: 80px;
      width: 33px;
    }
  }
  /* 파랑이 */
  & img:nth-child(2) {
    z-index: 2;
    position: absolute;
    top: 55px;
    right: 30px;
    width: 48px;
    transform: rotate(39.424deg);

    @media screen and (max-width: 500px){
      top: 70px;
      right: 20px;
      width: 48px;
    }
  }
  /* 빨강이 */
  & img:nth-child(3) {
    z-index: 2;
    position: absolute;
    top: 100px;
    right: 100px;
    width: 64px;
    transform: rotate(-41.439deg);

    @media screen and (max-width: 500px){
      top: 115px;
      right: 90px;
      width: 54px;
    }
  }
  /* 노랑이 */
  & img:nth-child(4) {
    z-index: 1;
    position: absolute;
    top: 90px;
    right: 20px;
    width: 87px;
    transform: rotate(18.396deg);

    @media screen and (max-width: 500px){
      top: 100px;
      right: 10px;
      width: 87px;
    }
    }
`