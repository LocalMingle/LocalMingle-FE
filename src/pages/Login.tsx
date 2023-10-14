import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/UserState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { validateEmail } from "../util/validation";
import { setTokens } from "../util/token";
import { Button } from "../components/common/Button";

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
      if (response.status === 201) {
        const accessToken = response.headers["accesstoken"];
        const refreshToken = response.headers["refreshtoken"];
        setTokens(accessToken, refreshToken);
        const userId = response.data.userId;
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

  const handleJoinClick = () => {
    navigate("/join");
  };

  return (
    <Container>
      <Title>로그인</Title>
      <LabelWrapper>
        <label>이메일</label>
        <InputWithIcon>
          <StyledInput
            type="email"
            value={email}
            onChange={handleEmailChange}
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
      </LabelWrapper>

      <LabelWrapper>
        <label>비밀번호</label>
        <InputWithIcon>
          <StyledInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </LabelWrapper>

      <Button onClick={handleLogin}>로그인</Button>

      <SignupText>
        로컬밍글의 회원이 아니신가요?!{" "}
        <span onClick={handleJoinClick}>회원가입하기</span>
      </SignupText>
    </Container>
  );
};
export default LoginPage;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%; // 여기 폭을 너가 원하는대로 조절해도 되!
  position: relative;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
  }
`;

const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const ClearIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 이거 추가해서 중앙에 오게 해줬어
  height: 100vh;
  padding: 50px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 6px;
  height: 35px;
  border-radius: 6px;
  border: 1px solid gray;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const SignupText = styled.div`
  margin-top: 20px;
  font-size: 10px;
  user-select: none;

  span {
    color: #da7969;
    cursor: pointer;
    text-decoration: none;
  }
`;
