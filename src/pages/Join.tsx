import React, { useState } from "react";
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
    <div>
      <h1>회원가입</h1>
      <label>
        닉네임:
        <input type="text" value={nickname} onChange={handleNicknameChange} />
      </label>
      <div>{nicknameError}</div>
      <br />
      <label>
        이메일:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <div>{emailError}</div>
      <br />
      <label>
        비밀번호:
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={togglePasswordVisibility}>
          {showPassword ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </button>
      </label>
      <div>{passwordError}</div>
      <br />
      <label>
        비밀번호 확인:
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </label>
      <div>{confirmPasswordError}</div>
      <br />
      <label>
        한줄 자기 소개:
        <input type="text" value={bio} onChange={handleBioChange} />
      </label>
      <div>{bioError}</div>
      {isLoading && <div>회원가입 중...</div>}
      <br />
      <Button onClick={handleSignUp}>회원가입</Button>
    </div>
  );
};

export default SignUpForm;
