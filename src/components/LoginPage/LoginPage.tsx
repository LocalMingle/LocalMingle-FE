import React, { useState } from "react";
import * as ST from "./STLoginPage";
import jwtDecode from "jwt-decode";
import naverLogo from "../../asset/buttonImages/naverlogin.png";
import googleLogo from "../../asset/buttonImages/googlelogin.png";
import kakaoLogo from "../../asset/buttonImages/kakaologin.png";
import { useRecoilState } from "recoil";
import { setTokens } from "../../util/token";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { axiosInstance } from "../../api/axiosInstance";
import { userState } from "../../recoil/atoms/UserState";
import { useLanguage } from "../../util/Locales/useLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { validateEmail, validateLoginPassword } from "../../util/validation";

interface DecodedToken {
  sub: number;
}
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentLang, t, changeLanguage } = useLanguage();
  const [, setUser] = useRecoilState(userState);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleLogin = async () => {
    setEmailError(validateEmail(email));
    setPasswordError(t(validateLoginPassword(password)));

    if (emailError || passwordError) {
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/users/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("response.headers", response.headers);
      if (response.status === 200) {
        const accessToken = response.headers["accesstoken"];
        const refreshToken = response.headers["refreshtoken"];
        setTokens(accessToken, refreshToken);
        const userId = (jwtDecode(accessToken) as DecodedToken).sub;
        console.log("userId", userId);

        setUser({ userId });

        navigate("/");
        toast.success(t("환영합니다!"), {
          className: "toast-success toast-container",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error("이메일이나 비밀번호를 다시 확인해주세요", {
          className: "toast-error toast-container",
        });
      }
    }
  };

  const kakaoLoginHandler = () => {
    const REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL;
    // "https://www.totobon6125.store";
    const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
      `${REACT_APP_URL}/users/login/kakao`
    )}&client_id=${import.meta.env.VITE_REACT_APP_KAKAO_CLIENT_ID}`;
    window.location.href = kakaoOauthURL;
  };

  const googleLoginHandler = () => {
    const REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL;
    const googleOauthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&scope=openid%20profile%20email&redirect_uri=${encodeURIComponent(
      `${REACT_APP_URL}/users/login/google`
    )}&access_type=offline`;
    window.location.href = googleOauthURL;
  };

  const naverLoginHandler = () => {
    const REACT_APP_URL = import.meta.env.VITE_REACT_APP_URL;
    const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const STATE = "false";
    const naverOauthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${encodeURIComponent(
      `${REACT_APP_URL}/users/login/naver`
    )}`;

    window.location.href = naverOauthURL;
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);
    setEmailError(t(validateEmail(newValue)));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setPasswordError(t(validateLoginPassword(newValue)));
  };
  const handleJoinClick = () => {
    navigate("/join");
  };
  const goToMain = () => {
    navigate("/");
  };

  return (
    <ST.Container>
      <Toaster />
      <h1 onClick={goToMain}>{t("로그인")}</h1>
      <button onClick={changeLanguage}>
        {currentLang === "ko" ? "🇰🇷" : currentLang === "en" ? "🇺🇸" : "🇯🇵"}
      </button>
      {/* <img src="" alt="logo" onClick={goToMain}>로고</img> */}
      <ST.LabelWrapper>
        <label>{t("이메일")}</label>
        <ST.InputWithIcon>
          <ST.StyledInput
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          {email && (
            <ST.ClearIcon onClick={() => setEmail("")}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="sm"
                style={{ color: "#9ca5b4" }}
              />
            </ST.ClearIcon>
          )}
        </ST.InputWithIcon>
        <ST.ErrorMessageLogin>{emailError}</ST.ErrorMessageLogin>
      </ST.LabelWrapper>
      <ST.LabelWrapper>
        <label>{t("비밀번호")}</label>
        <ST.InputWithIcon>
          <ST.StyledInput
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {password && (
            <ST.ClearIcon onClick={() => setPassword("")}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="sm"
                style={{ color: "#9ca5b4" }}
              />
            </ST.ClearIcon>
          )}
        </ST.InputWithIcon>
        <ST.ErrorMessageLogin>{passwordError}</ST.ErrorMessageLogin>
      </ST.LabelWrapper>
      <Button onClick={handleLogin}>{t("로그인")}</Button>
      <ST.SignupText>
        {t("로컬밍글의 회원이 아니신가요?")}{" "}
        <span onClick={handleJoinClick}>{t("회원가입")}</span>
      </ST.SignupText>
      <ST.Divider>
        <ST.Line />
        <ST.Text>{t("소셜로그인으로 간편 로그인")}</ST.Text>
        <ST.Line />
      </ST.Divider>
      <ST.ButtonContainer>
        <ST.KakaoLoginBtn
          onClick={kakaoLoginHandler}
          src={kakaoLogo}
          alt="kakaologin"
        ></ST.KakaoLoginBtn>
        <ST.GoogleLoginBtn
          onClick={googleLoginHandler}
          src={googleLogo}
          alt="googlelogin"
        ></ST.GoogleLoginBtn>
        <ST.NaverLoginBtn
          onClick={naverLoginHandler}
          src={naverLogo}
          alt="naverlogin"
        ></ST.NaverLoginBtn>
      </ST.ButtonContainer>
    </ST.Container>
  );
};
export default LoginPage;
