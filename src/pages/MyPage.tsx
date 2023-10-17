import React from "react";
import { Outlet } from "react-router-dom";
import MyPageTabs from "../components/Mypage/MypageTabs/MypageTabs";

const MyPage: React.FC = () => {
  return (
    <>
      <MyPageTabs />
      <Outlet />
    </>
  );
};

export default MyPage;
