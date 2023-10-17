import React, { useState } from "react";
import * as ST from "./STJoinPage";
import { Button } from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/UserState";
import { axiosInstance } from "../../api/axiosInstance";
import {
  validateNickname,
  validatePassword,
  validatePasswordConfirmation,
  validateEmail,
  validateBio,
  handleCheckNickname,
  handleCheckEmail,
} from "../../util/validation";
import JSConfetti from "js-confetti";

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
  const jsConfetti = new JSConfetti();

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

      if (response.status === 201) {
        setUser({
          userId: response.data.userId,
        });

        jsConfetti.addConfetti({
          confettiColors: [
            "#FFA7A7",
            "#FFCC67",
            "#FFFF9D",
            "#AEEA00",
            "#AEC6FF",
            "#D1B2FF",
          ],
          confettiRadius: 6,
          confettiNumber: 1000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
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

  const handleNicknameDupCheck = async () => {
    const errorMessage = await handleCheckNickname(nickname);
    setNicknameError(errorMessage);
  };

  const handleEmailDupCheck = async () => {
    const errorMessage = await handleCheckEmail(email);
    setEmailError(errorMessage);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goToMain = () => {
    navigate("/");
  };
  return (
    <ST.Wrapper>
      <div onClick={goToMain}>회원가입</div>
      {/* <img src="" alt="logo" onClick={goToMain}>로고</img> */}
      <ST.LabelWrapper>
        <label>닉네임</label>
        <div>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <ST.DupCheckButtonWrap>
            <ST.DupCheckButton onClick={handleNicknameDupCheck}>
              중복 체크
            </ST.DupCheckButton>
          </ST.DupCheckButtonWrap>
        </div>
      <ST.ErrorMessageJoin>{nicknameError}</ST.ErrorMessageJoin>
      </ST.LabelWrapper>

      <ST.LabelWrapper>
        <label>이메일</label>
        <div>
          <input type="email" value={email} onChange={handleEmailChange} />
          <ST.DupCheckButtonWrap>
            <ST.DupCheckButton onClick={handleEmailDupCheck}>
              중복 체크
            </ST.DupCheckButton>
          </ST.DupCheckButtonWrap>
        </div>
      <ST.ErrorMessageJoin>{emailError}</ST.ErrorMessageJoin>
      </ST.LabelWrapper>

      <ST.LabelWrapper>
        <label>비밀번호</label>
        <ST.EyleToggleWrap>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          />
            <ST.EyeToggleButton onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </ST.EyeToggleButton>
        </ST.EyleToggleWrap>
      <ST.ErrorMessageJoin>{passwordError}</ST.ErrorMessageJoin>
      </ST.LabelWrapper>

      <ST.LabelWrapper>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      <ST.ErrorMessageJoin>{confirmPasswordError}</ST.ErrorMessageJoin>
      </ST.LabelWrapper>

      <ST.LabelWrapper>
        <label>한줄 자기 소개</label>
        <input type="text" value={bio} onChange={handleBioChange} />
      <ST.ErrorMessageJoin>{bioError}</ST.ErrorMessageJoin>
      </ST.LabelWrapper>
      {isLoading && <div>회원가입 중...</div>}
      <Button onClick={handleSignUp}>회원가입</Button>
    </ST.Wrapper>
  );
};

export default SignUpForm;
