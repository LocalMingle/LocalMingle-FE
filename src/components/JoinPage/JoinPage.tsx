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
import { useLanguage } from "../../util/Locales/useLanguage";

const SignUpForm: React.FC = () => {
  const { currentLang, t, changeLanguage } = useLanguage();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  // 성별 state
  // const [gender, setGender] = useState("");
  // const [genderError, setGenderError] = useState("");
  // 생년월일 state
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const navigate = useNavigate();
  const jsConfetti = new JSConfetti();

  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [bioError, setBioError] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);

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
        intro: bio,
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
      console.log("서버 응답:", response);
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

  // 성별 체인지 체인지
  // const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const newValue = e.target.value;
  //   setGender(newValue);
  //   setGenderError(newValue ? "" : "필수 정보입니다.");
  // };
  // 생년 월 일 체인지
  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthYear(e.target.value);
  };

  const handleBirthMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(e.target.value);
  };

  const handleBirthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDay(e.target.value);
  };

  const handleNicknameDupCheck = async () => {
    const errorMessage = await handleCheckNickname(nickname);
    setNicknameError(errorMessage);
    setIsNicknameValid(errorMessage === "닉네임을 사용할 수 있습니다.");
  };

  const handleEmailDupCheck = async () => {
    const errorMessage = await handleCheckEmail(email);
    setEmailError(errorMessage);
    setIsEmailValid(errorMessage === "이메일을 사용할 수 있습니다.");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goToMain = () => {
    navigate("/");
  };
  return (
    <ST.Wrapper>
      <div onClick={goToMain}>{t("회원가입")}</div>
      <button onClick={changeLanguage}>
        {currentLang === "ko" ? "🇰🇷" : currentLang === "en" ? "🇺🇸" : "🇯🇵"}
      </button>
      {/* <img src="" alt="logo" onClick={goToMain}>로고</img> */}
      <ST.LabelWrapper>
        <label>{t("닉네임")}</label>
        <div>
          <input type="text" value={nickname} onChange={handleNicknameChange} />
          <ST.DupCheckButtonWrap>
            <ST.DupCheckButton onClick={handleNicknameDupCheck}>
              {t("중복 체크")}
            </ST.DupCheckButton>
          </ST.DupCheckButtonWrap>
        </div>
        <ST.ValidationColor isValid={isNicknameValid}>
          {nicknameError}
        </ST.ValidationColor>
      </ST.LabelWrapper>

      <ST.LabelWrapper>
        <label>{t("이메일")}</label>
        <div>
          <input type="email" value={email} onChange={handleEmailChange} />
          <ST.DupCheckButtonWrap>
            <ST.DupCheckButton onClick={handleEmailDupCheck}>
              {t("중복 체크")}
            </ST.DupCheckButton>
          </ST.DupCheckButtonWrap>
        </div>
        <ST.ValidationColor isValid={isEmailValid}>
          {emailError}
        </ST.ValidationColor>
      </ST.LabelWrapper>

      <ST.LabelWrapper>
        <label>{t("비밀번호")}</label>
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
        <label>{t("비밀번호 확인")}</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <ST.ErrorMessageJoin>{confirmPasswordError}</ST.ErrorMessageJoin>
      </ST.LabelWrapper>
      <ST.LabelWrapper>
        <label>{t("생년월일")}</label>
        <div id="bir_wrap">
          {/* BIRTH_YY */}
          <div id="bir_yy">
            <span className="box">
              <input
                type="text"
                id="yy"
                className="int"
                maxLength={4}
                placeholder="YYYY"
                value={birthYear}
                onChange={handleBirthYearChange}
              />
            </span>
          </div>

          {/* BIRTH_MM */}
          <div id="bir_mm">
            <span className="box">
              <select
                id="mm"
                className="sel"
                value={birthMonth}
                onChange={handleBirthMonthChange}
              >
                <option>월</option>
                <option value="01">1</option>
                <option value="02">2</option>
                <option value="03">3</option>
                <option value="04">4</option>
                <option value="05">5</option>
                <option value="06">6</option>
                <option value="07">7</option>
                <option value="08">8</option>
                <option value="09">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </span>
          </div>

          {/* BIRTH_DD */}
          <div id="bir_dd">
            <span className="box">
              <input
                type="text"
                id="dd"
                className="int"
                maxLength={2}
                placeholder="DD"
                value={birthDay}
                onChange={handleBirthDayChange}
              />
            </span>
          </div>
        </div>
        {/* 에러 메시지를 표시할 수 있는 부분 (선택사항) */}
        {/* <ST.ErrorMessageJoin>{birthError}</ST.ErrorMessageJoin> */}
      </ST.LabelWrapper>
      {/* <ST.LabelWrapper>
        <label>{t("성별")}</label>
        <div className="box gender_code">
          <select
            id="gender"
            className="sel"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="M">남자</option>
            <option value="F">여자</option>
          </select>
        </div>
        <ST.ErrorMessageJoin>{genderError}</ST.ErrorMessageJoin>
      </ST.LabelWrapper> */}
      <ST.LabelWrapper>
        <label>{t("한줄 자기소개")}</label>
        <input type="text" value={bio} onChange={handleBioChange} />
        <ST.ErrorMessageJoin>{bioError}</ST.ErrorMessageJoin>
      </ST.LabelWrapper>
      {isLoading && <div>{t("회원가입 중...")}</div>}
      <Button onClick={handleSignUp}>{t("회원가입")}</Button>
    </ST.Wrapper>
  );
};

export default SignUpForm;
