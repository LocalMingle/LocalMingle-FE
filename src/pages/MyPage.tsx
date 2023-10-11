import React from "react";
import Header from "../components/common/Header/Header";
import { useNavigate } from "react-router-dom";

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header></Header>
      <p>이곳은 마이 페이지 입니다.</p>
      <div onClick={() => navigate("/mypage/userinfo")}>개인정보 관리</div>
      <div onClick={() => navigate("/mypage/makelist")}>
        내가 만든 모임 리스트
      </div>
      <div onClick={() => navigate("/mypage/joinlist")}>참가 모임 리스트</div>
      <div onClick={() => navigate("/mypage/deleteuser")}>회원탈퇴</div>
    </>
  );
};

export default MyPage;
