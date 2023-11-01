import React, { useState } from "react";
import * as St from "./STLoginPage";
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
import textlogo from "../../asset/localMingleImages/textlogo.png";
import Mingle from "../../asset/localMingleImages/Mingle.png";
import kologo from "../../asset/languageImages/kologo.png";
import enlogo from "../../asset/languageImages/enlogo.png";
import jplogo from "../../asset/languageImages/jplogo.png";


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
        toast.error(t("이메일이나 비밀번호를 다시 확인해주세요"), {
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
    <St.Container>
      <Toaster />
      <St.Icon onClick={goToMain}>
        <img src={Mingle} alt="밍글이" />
        <img src={textlogo} alt="로컬밍글" />
      </St.Icon>
      {/* 다국어 지원 */}
      {/* default 값을 공용어인 영어로 지정 */}
      <St.Language onClick={changeLanguage}>
        {(() => {
          switch (currentLang) {
            case "ko":
              return (<img src={kologo} alt="Korean" />);
            case "jp":
              return (<img src={jplogo} alt="Japanese" />);
            default: 
              return (<img src={enlogo} alt="English" />);
          }
        })()}
      </St.Language>
      <St.LabelWrapper>
        <label>{t("이메일")}</label>
        <St.InputWithIcon>
          <St.StyledInput
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          {email && (
            <St.ClearIcon onClick={() => setEmail("")}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="sm"
                style={{ color: "#9ca5b4" }}
              />
            </St.ClearIcon>
          )}
        </St.InputWithIcon>
        <St.ErrorMessageLogin>{emailError}</St.ErrorMessageLogin>
      </St.LabelWrapper>
      <St.LabelWrapper>
        <label>{t("비밀번호")}</label>
        <St.InputWithIcon>
          <St.StyledInput
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {password && (
            <St.ClearIcon onClick={() => setPassword("")}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="sm"
                style={{ color: "#9ca5b4" }}
              />
            </St.ClearIcon>
          )}
        </St.InputWithIcon>
        <St.ErrorMessageLogin>{passwordError}</St.ErrorMessageLogin>
      </St.LabelWrapper>
      <Button onClick={handleLogin}>{t("로그인")}</Button>
      <St.SignupText>
        {t("로컬밍글의 회원이 아니신가요?")}{" "}
        <span onClick={handleJoinClick}>{t("회원가입")}</span>
      </St.SignupText>
      <St.Divider>
        <St.Line />
        <St.Text>{t("소셜로그인으로 간편 로그인")}</St.Text>
        <St.Line />
      </St.Divider>
      <St.ButtonContainer>
        <St.NaverLoginBtn
          onClick={naverLoginHandler}
          src={naverLogo}
          alt="naverlogin"
        ></St.NaverLoginBtn>
        <St.GoogleLoginBtn
          onClick={googleLoginHandler}
          src={googleLogo}
          alt="googlelogin"
        ></St.GoogleLoginBtn>
        <St.KakaoLoginBtn
          onClick={kakaoLoginHandler}
          src={kakaoLogo}
          alt="kakaologin"
        ></St.KakaoLoginBtn>
      </St.ButtonContainer>
    </St.Container>
  );
};
export default LoginPage;
