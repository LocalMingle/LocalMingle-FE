import React from "react";
import * as St from "./STBanner";
import Local from "../../../asset/localMingleImages/local.png";
import Mingle from "../../../asset/localMingleImages/mingle_2.png";
import eyes from "../../../asset/localMingleImages/eyes.png";

const Banner: React.FC = () => {
  return (
    <St.BannerSection>
      <St.BannerContent>
        <St.EyesWrap>
          <img src={eyes} alt="eyes_1" />
          <img src={eyes} alt="eyes_2" />
        </St.EyesWrap>

        <h3>동네 사람들과 같은 취미 공유!</h3>
        <p>지금 다양한 사람들과 함께<br/>소모임을 즐겨 보세요~</p>

        <St.LogoWrap>
          <img src={Local} alt="Local" />
          <img src={Mingle} alt="Mingle" />
        </St.LogoWrap>

      </St.BannerContent>
    </St.BannerSection>
  );
};

export default Banner;
