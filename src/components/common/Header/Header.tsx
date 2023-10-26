import React from "react";
import * as St from "./STHeader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../../util/toastStyles.css";
import { useRecoilState } from "recoil";
import { isLoginState } from "../../../recoil/atoms/UserState";
import { useEffect } from "react";
import { useLanguage } from "../../../util/Locales/useLanguage";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLoginState] = useRecoilState(isLoginState);
  const { currentLang, t, changeLanguage } = useLanguage();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken ? setIsLoginState(true) : setIsLoginState(false);
  }, [setIsLoginState]);

  // (로고)메인 페이지로 이동
  const goToMain = () => {
    navigate("/");
  };

  // 마이 페이지로 이동
  const goToMyPage = () => {
    navigate("/mypage");
  };

  // 로그인 페이지로 이동
  const login = () => {
    navigate("/login");
  };

  // 로그아웃 : 토큰 삭제
  const logout = () => {
    toast.success(t("로그아웃이 완료되었습니다."), {
      className: "toast-success toast-container",
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    setIsLoginState(false);
    navigate("/");
  };

  return (
    <>
      {isLogin === false ? (
        /* 로그인 전 */
        <St.HeaderWrap>
          <img onClick={goToMain} src="/../src/asset/localMingleImages/textlogo.png" alt="로컬밍글로고" />
          <St.HeaderBtns>
            <button onClick={login}>{t("로그인")}</button>
            <button onClick={changeLanguage}>
              {currentLang === "ko" ? "🇰🇷" : currentLang === "en" ? "🇺🇸" : "🇯🇵"}
            </button>
          </St.HeaderBtns>
        </St.HeaderWrap>
      ) : (
        /* 로그인 후 */
        <St.HeaderWrap>
          <img onClick={goToMain} src="/../src/asset/localMingleImages/textlogo.png" alt="로컬밍글로고" />
          <St.HeaderBtns>
            <button onClick={goToMyPage}>{t("마이페이지")}</button>
            <button onClick={logout}>{t("로그아웃")}</button>
            <button onClick={changeLanguage}>
              {currentLang === "ko" ? "🇰🇷" : currentLang === "en" ? "🇺🇸" : "🇯🇵"}
            </button>
          </St.HeaderBtns>
        </St.HeaderWrap>
      )}
    </>
  );
};

export default Header;
