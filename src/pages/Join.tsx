import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms/UserState";
import { axiosInstance } from "../api/axiosInstance";
import {
  validateNickname,
  validatePassword,
  validatePasswordConfirmation,
  validateEmail,
  validateBio,
} from "../util/validation";

const SignUpForm: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [bioError, setBioError] = useState("");

  const handleSignUp = async () => {
    const newNicknameError = validateNickname(nickname);
    const newEmailError = validateEmail(email);
    const newPasswordError = validatePassword(password);
    const newConfirmPasswordError = validatePasswordConfirmation(
      password,
      confirmPassword
    );
    const newBioError = validateBio(bio);

    setNicknameError(newNicknameError);
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    setConfirmPasswordError(newConfirmPasswordError);
    setBioError(newBioError);

    if (
      newNicknameError ||
      newEmailError ||
      newPasswordError ||
      newConfirmPasswordError ||
      newBioError
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(`users/signup`, {
        nickname,
        email,
        password,
        confirmPassword,
        bio,
      });

      if (response.status === 200 || response.status === 201) {
        setUser({
          userId: response.data.userId,
        });

        navigate("/login");
      } else {
        console.error("예상치 못한 응답:", response);
      }
    } catch (error: unknown) {
      console.error("회원가입 중 에러 발생:", error);

      if (error && typeof error === "object" && "response" in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.error("서버 응답:", (error as any).response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNickname(newValue);
    setNicknameError(validateNickname(newValue));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);
    setEmailError(validateEmail(newValue));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setPasswordError(validatePassword(newValue));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    setConfirmPasswordError(validatePasswordConfirmation(password, newValue));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setBio(newValue);
    setBioError(validateBio(newValue));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <LabelWrapper>
        <label>닉네임</label>
        <Input type="text" value={nickname} onChange={handleNicknameChange} />
      </LabelWrapper>
      <div>{nicknameError}</div>
      <br />
      <LabelWrapper>
        <label>이메일</label>
        <Input type="email" value={email} onChange={handleEmailChange} />
      </LabelWrapper>
      <div>{emailError}</div>
      <br />
      <LabelWrapper>
        <label>비밀번호</label>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
        />
        <EyeToggleButton onClick={togglePasswordVisibility}>
          {showPassword ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </EyeToggleButton>
      </LabelWrapper>
      <div>{passwordError}</div>
      <br />
      <LabelWrapper>
        <label>비밀번호 확인</label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </LabelWrapper>
      <div>{confirmPasswordError}</div>
      <br />
      <LabelWrapper>
        <label>한줄 자기 소개</label>
        <Input type="text" value={bio} onChange={handleBioChange} />
      </LabelWrapper>
      <div>{bioError}</div>
      {isLoading && <div>회원가입 중...</div>}
      <br />
      <Button onClick={handleSignUp}>회원가입</Button>
    </Wrapper>
  );
};

export default SignUpForm;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 70%;
  position: relative;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
  }
`;

const Input = styled.input`
  padding: 6px;
  width: 100%;
  height: 35px;
  border-radius: 6px;
  border: 1px solid gray;
`;

const EyeToggleButton = styled.button`
  position: absolute;
  right: 6px;
  top: 69%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;
