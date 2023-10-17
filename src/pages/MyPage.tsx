import React from "react";
import { Outlet } from "react-router-dom";
import MyPageTabs from "../components/Mypage/MypageTabs/MypageTabs";
import { Header } from "../components/common/Header";

const MyPage: React.FC = () => {
  return (
    <>
    {/* 231018 JSY 이동 불편으로 임시로 header 컴포넌트 불러옴 */}
      <Header></Header>
      <MyPageTabs />
      <Outlet />
    </>
  );
};

export default MyPage;
