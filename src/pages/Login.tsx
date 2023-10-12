import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/UserState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { validateEmail } from "../util/validation";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const [, setUser] = useRecoilState(userState);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);
    setEmailError(validateEmail(newValue));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
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

      if (response.status === 201) {
        console.log(response);
        const accessToken = response.headers.accessToken;
        const refreshToken = response.headers.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("accessToken", accessToken);
        const userId = response.data.userId;
        setUser({ userId });
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        // 기타 오류 처리도 필요하다면 여기에 추가해
      }
    }
  };

  const handleJoinClick = () => {
    navigate("/join");
  };

  return (
    <div>
      <h2>로그인</h2>
      <InputWithIcon>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일"
        />
        {email && (
          <ClearIcon onClick={() => setEmail("")}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#9ca5b4" }}
            />
          </ClearIcon>
        )}
      </InputWithIcon>
      <div>{emailError}</div>
      <br />
      <InputWithIcon>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        {password && (
          <ClearIcon onClick={() => setPassword("")}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#9ca5b4" }}
            />
          </ClearIcon>
        )}
      </InputWithIcon>
      <br />
      <br />
      <button onClick={handleLogin}>로그인</button>
      <div>
        로컬밍글의 회원이 아니신가요??{" "}
        <span onClick={handleJoinClick}>회원가입하기</span>
      </div>
    </div>
  );
};

export default LoginPage;

const InputWithIcon = styled.div`
  position: relative;
  display: inline-block;
`;

const ClearIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;
