import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header/Header";
import MainPage from "../components/MainPage/MainPage";
import { useEffect } from "react";
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
      if (userId !== null) {
        setUser({ userId: Number(userId) });
        document.cookie = `accessToken=${accessToken}; path=/;`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;
        setIsLoginState(true);
      } else {
        console.error("userId is null");
      }
    }
    navigate("/", { replace: true });
  }, [setIsLoginState, setUser, navigate]);

  return (
    <>
      <Header></Header>
      <MainPage></MainPage>
    </>
  );
};

export default Main;
