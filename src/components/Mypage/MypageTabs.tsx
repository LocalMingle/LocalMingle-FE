import React from "react";
import * as St from './STMypageTabs'
import { useNavigate } from "react-router-dom";

const MyPageTabs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <St.TabContainer>
      <St.TabItem onClick={() => navigate("/mypage/userinfo")}>개인정보 관리</St.TabItem>
      <St.TabItem onClick={() => navigate("/mypage/makelist")}>내가 만든 모임 리스트</St.TabItem>
      <St.TabItem onClick={() => navigate("/mypage/joinlist")}>참가 모임 리스트</St.TabItem>
      <St.TabItem onClick={() => navigate("/mypage/deleteuser")}>회원탈퇴</St.TabItem>
    </St.TabContainer>
  );
};

export default MyPageTabs;
