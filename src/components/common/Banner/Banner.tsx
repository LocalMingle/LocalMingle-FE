import React from "react";
import * as St from "./STBanner";
import eyes from "../../../asset/localMingleImages/eyes.png";
import blue from "../../../asset/localMingleImages/blue.png";
import red from "../../../asset/localMingleImages/red.png";
import yellow from "../../../asset/localMingleImages/yellow.png";
import { useLanguage } from "../../../util/Locales/useLanguage";

const Banner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <St.BannerSection>
      <St.BannerContent>
        <h3>{t("동네 사람들과 같은 취미 공유!")}</h3>
        <p>
          {t("지금 다양한 사람들과 함께")}
          <br />
          {t("소모임을 즐겨 보세요~")}
        </p>
        <St.BannerImg>
          <img src={eyes} alt="배너_눈" />
          <img src={blue} alt="배너_파랑이" />
          <img src={red} alt="배너_빨강이" />
          <img src={yellow} alt="배너_노랑이" />
        </St.BannerImg>
      </St.BannerContent>
    </St.BannerSection>
  );
};
export default Banner;