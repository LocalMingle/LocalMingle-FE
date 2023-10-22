import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import * as ST from "./STLoginPage";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/UserState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { validateEmail, validateLoginPassword } from "../../util/validation";
import { setTokens } from "../../util/token";
import { Button } from "../../components/common/Button";
import toast, { Toaster } from "react-hot-toast";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [, setUser] = useRecoilState(userState);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);
    setEmailError(validateEmail(newValue));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setPasswordError(validateLoginPassword(newValue));
  };

  const handleLogin = async () => {
    setEmailError(validateEmail(email));
    setPasswordError(validateLoginPassword(password));

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
        console.log(accessToken, refreshToken);
        setTokens(accessToken, refreshToken);
        console.log("response", response.data);
        const userId = response.data.userId;

        localStorage.setItem("userId", userId);

        setUser({ userId });
        console.log("로그인 후 userId:", userId);
        navigate("/");
        toast.success("환영합니다!", {
          className: "toast-success toast-container",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  // 쿠키로 받는다
  // const kakaoLoginHandler = () => {
  //   const REACT_APP_URL = "http://localhost:3000";
  //   const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
  //     `${REACT_APP_URL}/users/login/kakao`
  //   )}&client_id=${import.meta.env.VITE_REACT_APP_KAKAO_CLIENT_ID}`;
  //   window.location.href = kakaoOauthURL;
  // };

  const kakaoLoginHandler = () => {
    const REACT_APP_URL = "https://www.totobon6125.store";
    const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
      `${REACT_APP_URL}/users/login/kakao`
    )}&client_id=${import.meta.env.VITE_REACT_APP_KAKAO_CLIENT_ID}`;
    window.location.href = kakaoOauthURL;
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
      <h1 onClick={goToMain}>로그인</h1>
      {/* <img src="" alt="logo" onClick={goToMain}>로고</img> */}
      <ST.LabelWrapper>
        <label>이메일</label>
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
        <label>비밀번호</label>
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

      <Button onClick={handleLogin}>로그인</Button>
      <div>
        <ST.KakaoButton onClick={kakaoLoginHandler}>
          <img
            src="https://developers.kakao.com/tool/resource/static/img/button/login/simple/ko/kakao_login_small.png"
            width="70"
          />
        </ST.KakaoButton>
      </div>

      <ST.SignupText>
        로컬밍글의 회원이 아니신가요?{" "}
        <span onClick={handleJoinClick}>회원가입</span>
      </ST.SignupText>
    </ST.Container>
  );
};
export default LoginPage;
