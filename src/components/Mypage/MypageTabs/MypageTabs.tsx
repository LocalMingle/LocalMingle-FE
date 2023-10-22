import React, { useState } from "react";
import * as St from "./STMypageTabs";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../util/Locales/useLanguage";

const MyPageTabs: React.FC = () => {
  const location = useLocation();
  const initialTab =
    location.pathname === "/mypage" ? "/mypage/userinfo" : location.pathname;
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <St.TabContainer>
      <St.TabWrap>
        <St.TabItem
          tabcolor={selectedTab === "/mypage/userinfo" ? "#E38668" : "#fff"}
          onClick={() => {
            navigate("/mypage/userinfo");
            setSelectedTab("/mypage/userinfo");
          }}
        >
          {t("내 프로필")}
        </St.TabItem>
      </St.TabWrap>

      <St.TabWrap>
        <St.TabItem
          tabcolor={selectedTab === "/mypage/makelist" ? "#F09FC3" : "#fff"}
          onClick={() => {
            navigate("/mypage/makelist");
            setSelectedTab("/mypage/makelist");
          }}
        >
          {t("생성목록")}
        </St.TabItem>
      </St.TabWrap>

      <St.TabWrap>
        <St.TabItem
          tabcolor={selectedTab === "/mypage/joinlist" ? "#9ECBFA" : "#fff"}
          onClick={() => {
            navigate("/mypage/joinlist");
            setSelectedTab("/mypage/joinlist");
          }}
        >
          {t("참가목록")}
        </St.TabItem>
      </St.TabWrap>

      <St.TabWrap>
        <St.TabItem
          tabcolor={selectedTab === "/mypage/deleteuser" ? "#F0E0D5" : "#fff"}
          onClick={() => {
            navigate("/mypage/deleteuser");
            setSelectedTab("/mypage/deleteuser");
          }}
        >
          {t("회원탈퇴")}
        </St.TabItem>
      </St.TabWrap>
    </St.TabContainer>
  );
};

export default MyPageTabs;
