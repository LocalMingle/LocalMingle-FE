import React from "react";
import Header from "../components/common/Header/Header";
import MainPage from "../components/MainPage/MainPage";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoginState } from "../recoil/atoms/UserState";

const Main: React.FC = () => {
  const [, setisLoginState] = useRecoilState(isLoginState);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const userId = urlParams.get("userId");
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    console.log(accessToken, refreshToken);
    if (urlParams.size) {
      localStorage.setItem("userId", userId!);
      localStorage.setItem("accessToken", accessToken!);
      localStorage.setItem("refreshToken", refreshToken!);
      setisLoginState(true);
    }
    window.history.replaceState({}, document.title, "/");
  }, [setisLoginState]);

  return (
    <>
      <Header></Header>
      <MainPage></MainPage>
    </>
  );
};

export default Main;
