import React, { useState } from "react";
import * as St from "./STMypageTabs";
import { useNavigate } from "react-router-dom";

const MyPageTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("/mypage/userinfo");
  const navigate = useNavigate();

  return (
    <St.TabContainer>
      <St.TabWrap>
        <St.TabItem
          tabcolor={selectedTab === "/mypage/userinfo" ? "#58DF97" : "#fff"}
          onClick={() => {
            navigate("/mypage/userinfo");
            setSelectedTab("/mypage/userinfo");
          }}
        >
          프로필 수정
        </St.TabItem>
      </St.TabWrap>

      <St.TabWrap>
        <St.TabItem
          tabcolor={selectedTab === "/mypage/makelist" ? "#9DCBF9" : "#fff"}
          onClick={() => {
            navigate("/mypage/makelist");
            setSelectedTab("/mypage/makelist");
          }}
        >
          {/* 내가 만든 모임 리스트 */}
          생성 목록
        </St.TabItem>
      </St.TabWrap>

      <St.TabWrap>
        <St.TabItem
          tabcolor={selectedTab === "/mypage/joinlist" ? "#F19FC4" : "#fff"}
          onClick={() => {
            navigate("/mypage/joinlist");
            setSelectedTab("/mypage/joinlist");
          }}
        >
          {/* 참가 모임 리스트 */}
          참가 목록
        </St.TabItem>
      </St.TabWrap>

      <St.TabWrap>
        <St.TabItem
          tabcolor={selectedTab === "/mypage/deleteuser" ? "#E48668" : "#fff"}
          onClick={() => {
            navigate("/mypage/deleteuser");
            setSelectedTab("/mypage/deleteuser");
          }}
        >
          회원 탈퇴
        </St.TabItem>
      </St.TabWrap>
    </St.TabContainer>
  );
};

export default MyPageTabs;
