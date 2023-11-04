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

    if (userId !== null && accessToken !== null && refreshToken !== null) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser({ userId: Number(userId) });
      setIsLoginState(true);

      // localStorage에 값이 제대로 저장되었는지 확인
      const isStorageSet =
        localStorage.getItem("accessToken") === accessToken &&
        localStorage.getItem("refreshToken") === refreshToken;

      // 저장이 완료되었다면 페이지 이동
      if (isStorageSet) {
        navigate("/", { replace: true });
      }
    }
  }, []);

  return (
    <>
      <Header></Header>
      <MainPage></MainPage>
    </>
  );
};

export default Main;
