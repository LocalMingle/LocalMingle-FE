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
        `${import.meta.env.VITE_REACT_APP_URL}users/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const accessToken = response.headers["accesstoken"];
        const refreshToken = response.headers["refreshtoken"];
        setTokens(accessToken, refreshToken);
        console.log("response", response.data);
        const userId = response.data.userId;

        localStorage.setItem("userId", userId);

        setUser({ userId });
        console.log("로그인 후 userId:", userId);
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const kakaoLoginHandler = () => {
    const REST_API_KEY: string = import.meta.env
      .VITE_REACT_APP_KAKAO_CLIENT_ID as string;
    const REDIRECT_URI: string = import.meta.env
      .VITE_REACT_APP_KAKAO_REDIRECT_URI as string;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = link;
  };

  const handleJoinClick = () => {
    navigate("/join");
  };
  const goToMain = () => {
    navigate("/");
  };

  return (
    <ST.Container>
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
