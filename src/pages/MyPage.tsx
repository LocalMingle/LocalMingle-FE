import React from "react";
import MyPageTabs from "../components/Mypage/MypageTabs/MypageTabs";
import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";

const MyPage: React.FC = () => {
  return (
    <>
      <Header></Header>
      <MyPageTabs></MyPageTabs>
      <Outlet></Outlet>
    </>
  );
};

export default MyPage;
