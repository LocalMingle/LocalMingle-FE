import React, { useState } from "react";
import * as St from "./STMypageTabs";
import { useNavigate } from "react-router-dom";

const MyPageTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("/mypage/userinfo");
  const navigate = useNavigate();

  return (
    <St.TabContainer>
      <St.TabItem
        tabColor={selectedTab === "/mypage/userinfo" ? "#6CBFF8" : "white"}
        onClick={() => {
          navigate("/mypage/userinfo");
          setSelectedTab("/mypage/userinfo");
        }}
      >
        프로필 수정
      </St.TabItem>

      <St.TabItem
        tabColor={selectedTab === "/mypage/makelist" ? "#F2A8B2" : "white"}
        onClick={() => {
          navigate("/mypage/makelist");
          setSelectedTab("/mypage/makelist");
        }}
      >
        내가 만든 모임 리스트
      </St.TabItem>

      <St.TabItem
        tabColor={selectedTab === "/mypage/joinlist" ? "#84C7D0" : "white"}
        onClick={() => {
          navigate("/mypage/joinlist");
          setSelectedTab("/mypage/joinlist");
        }}
      >
        참가 모임 리스트
      </St.TabItem>

      <St.TabItem
        tabColor={selectedTab === "/mypage/deleteuser" ? "#F4BAC6" : "white"}
        onClick={() => {
          navigate("/mypage/deleteuser");
          setSelectedTab("/mypage/deleteuser");
        }}
      >
        회원탈퇴
      </St.TabItem>
    </St.TabContainer>
  );
};

export default MyPageTabs;
