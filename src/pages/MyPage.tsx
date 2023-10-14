import React from "react";
import Header from "../components/common/Header/Header";
import { Outlet } from "react-router-dom";
import MyPageTabs from "../components/Mypage/MypageTabs";

const MyPage: React.FC = () => {
  return (
    <>
      <Header></Header>
      <MyPageTabs />
      <Outlet />
    </>
  );
};

export default MyPage;
