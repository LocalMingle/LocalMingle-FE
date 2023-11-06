import React, { useState } from "react";
import * as St from "./STHeader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../../util/toastStyles.css";
import { useRecoilState } from "recoil";
import { isLoginState } from "../../../recoil/atoms/UserState";
import { useEffect } from "react";
import { useLanguage } from "../../../util/Locales/useLanguage";
import textlogo from "../../../asset/localMingleImages/textlogo.png";
import kologo from "../../../asset/languageImages/kologo.png";
import enlogo from "../../../asset/languageImages/enlogo.png";
import jplogo from "../../../asset/languageImages/jplogo.png";
// import ringlogo from "../../../asset/headerImages/ringlogo.png"
import userlogo from "../../../asset/headerImages/userlogo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLoginState] = useRecoilState(isLoginState);
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentLang, t, changeLanguage } = useLanguage();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken ? setIsLoginState(true) : setIsLoginState(false);
  }, [setIsLoginState]);

  // (로고) 메인페이지 이동 후 새로고침
  const goToMain = () => {
    navigate("/");
    window.location.reload();
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
      <St.HeaderWrap>
        <img onClick={goToMain} src={textlogo} alt="로컬밍글로고" />
        <St.HeaderBtns>
          {isLogin ? (
            <St.UserLogo onClick={toggleDropdown}>
              <img src={userlogo} alt="User" />
              {showDropdown && (
                <St.Dropdown>
                  <St.MyPageButton onClick={goToMyPage}>
                    {t("마이페이지")}
                  </St.MyPageButton>
                  <St.DropdownButton onClick={logout}>
                    {t("로그아웃")}
                  </St.DropdownButton>
                </St.Dropdown>
              )}
            </St.UserLogo>
          ) : (
            <button onClick={login}>{t("로그인")}</button>
          )}
          <St.Language onClick={changeLanguage}>
            {(() => {
              switch (currentLang) {
                case "ko":
                  return <img src={kologo} alt="Korean" />;
                case "jp":
                  return <img src={jplogo} alt="Japanese" />;
                default:
                  return <img src={enlogo} alt="English" />;
              }
            })()}
          </St.Language>
        </St.HeaderBtns>
      </St.HeaderWrap>
    </>
  );
};

export default Header;
