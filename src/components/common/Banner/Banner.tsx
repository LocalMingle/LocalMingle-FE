import React from "react";
import * as St from "./STBanner";
import eyes from "../../../asset/localMingleImages/eyes.png";
import { useLanguage } from "../../../util/Locales/useLanguage";

const Banner: React.FC = () => {
  const { t } = useLanguage();
  return (
    <St.BannerSection>
      <St.BannerContent>
        <St.EyesWrap>
          <img src={eyes} alt="eyes_1" />
          <img src={eyes} alt="eyes_2" />
        </St.EyesWrap>

        <h3>{t("동네 사람들과 같은 취미 공유!")}</h3>
        <p>
          {t("지금 다양한 사람들과 함께")}
          <br />
          {t("소모임을 즐겨 보세요~")}
        </p>

        {/* <St.LogoWrap>
        </St.LogoWrap> */}

      </St.BannerContent>
    </St.BannerSection>
  );
};

export default Banner;
