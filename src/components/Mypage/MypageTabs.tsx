import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPageTabs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <TabContainer>
      <TabItem onClick={() => navigate("/mypage/userinfo")}>
        개인정보 관리
      </TabItem>
      <TabItem onClick={() => navigate("/mypage/makelist")}>
        내가 만든 모임 리스트
      </TabItem>
      <TabItem onClick={() => navigate("/mypage/joinlist")}>
        참가 모임 리스트
      </TabItem>
      <TabItem onClick={() => navigate("/mypage/deleteuser")}>회원탈퇴</TabItem>
    </TabContainer>
  );
};

export default MyPageTabs;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TabItem = styled.div`
  text-align: center;
`;
