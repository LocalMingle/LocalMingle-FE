import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header/Header";
import MainPage from "../components/MainPage/MainPage";
import { useRecoilState } from "recoil";
import { isLoginState, userState } from "../recoil/atoms/UserState";

const Main: React.FC = () => {
  const [, setIsLoginState] = useRecoilState(isLoginState);
  const [, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (urlParams.size) {
      if (userId !== null && accessToken !== null && refreshToken !== null) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUser({ userId: Number(userId) });
        setIsLoginState(true);
      }
    }
    navigate("/", { replace: true });
  }, []); // useEffect의 두 번째 인자를 빈 배열로 도전

  return (
    <>
      <Header></Header>
      <MainPage></MainPage>
    </>
  );
};

export default Main;
