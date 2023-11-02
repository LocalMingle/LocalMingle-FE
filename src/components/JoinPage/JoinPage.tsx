import React, { useState, useEffect } from "react";
import * as ST from "./STJoinPage";
import toast from "react-hot-toast";
import JSConfetti from "js-confetti";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { userState } from "../../recoil/atoms/UserState";
import { axiosInstance } from "../../api/axiosInstance";
import { useLanguage } from "../../util/Locales/useLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  validateBio,
  validateEmail,
  validateNickname,
  validatePassword,
  handleCheckEmail,
  handleCheckNickname,
  validateAuthCodeTimer,
  validateEmailVerification,
  validatePasswordConfirmation,
} from "../../util/validation";
import {
  checkNickname,
  verifyEmailCode,
  sendVerificationEmail,
} from "../../api/api";
import textlogo from "../../asset/localMingleImages/textlogo.png";
import kologo from "../../asset/languageImages/kologo.png";
import enlogo from "../../asset/languageImages/enlogo.png";
import jplogo from "../../asset/languageImages/jplogo.png";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const jsConfetti = new JSConfetti();
  const [, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const { currentLang, t, changeLanguage } = useLanguage();
  const [shouldRunTimer, setShouldRunTimer] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [bioError, setBioError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [authCode, setAuthCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [, setIsSuccess] = useState<null | boolean>(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);

  const handleSignUp = async () => {
    if (!isNicknameChecked && !isEmailVerified) {
      toast.error(t("닉네임 중복 체크와 이메일 인증을 해주세요."), {
        className: "toast-error toast-container",
      });
      return;
    }
    if (!isNicknameChecked) {
      toast.error(t("닉네임 중복체크를 해주세요."), {
        className: "toast-error toast-container",
      });
      return;
    }

    if (!isEmailVerified) {
      toast.error(t("이메일 인증을 해주세요."), {
        className: "toast-error toast-container",
      });
      return;
    }
    const newEmailError = t(validateEmail(email));
    const newNicknameError = t(validateNickname(nickname));
    const newPasswordError = t(validatePassword(password));
    const newConfirmPasswordError = t(
      validatePasswordConfirmation(password, confirmPassword)
    );
    const newBioError = t(validateBio(bio));

    setBioError(newBioError);
    setEmailError(newEmailError);
    setNicknameError(newNicknameError);
    setPasswordError(newPasswordError);
    setConfirmPasswordError(newConfirmPasswordError);

    if (
      newBioError ||
      newEmailError ||
      newNicknameError ||
      newPasswordError ||
      newConfirmPasswordError
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(`users/signup`, {
        email,
        password,
        nickname,
        intro: bio,
        confirmPassword,
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

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const startTimer = () => {
      if (countdown === null) {
        setCountdown(300);
      }

      if (timer !== null) {
        clearInterval(timer);
      }

      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown !== null && prevCountdown > 0) {
            return prevCountdown - 1;
          } else if (prevCountdown === 0) {
            clearInterval(timer!);
            setIsTimerExpired(true);
            setAuthError(t("인증 코드의 유효시간이 지났습니다."));
            return 0;
          }
          return null;
        });
      }, 1000);
    };

    if (shouldRunTimer && !isEmailVerified) {
      startTimer();
    } else if (timer !== null) {
      clearInterval(timer);
    }

    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [shouldRunTimer, isEmailVerified, t, countdown]);

  const handleSendEmail = async () => {
    const errorMessage = t(await handleCheckEmail(email));
    setEmailError(errorMessage);

    if (errorMessage !== t("이메일을 사용할 수 있습니다.")) {
      setIsEmailValid(false);
      return;
    }

    setIsEmailValid(true);

    try {
      toast.success(t("인증코드가 전송되었습니다."), {
        className: "toast-success toast-container",
        duration: 3000,
      });
      await sendVerificationEmail(email, "", "");
      setEmailSent(true);
      setIsTimerExpired(false);
      setShouldRunTimer(false);
      setShouldRunTimer(true);
    } catch (error) {
      console.error("이메일 보내기 실패:", error);
    }
  };

  const handleAuth = async () => {
    setIsLoading(true);

    try {
      const response = await verifyEmailCode(Number(authCode));

      setIsLoading(false);

      if (response.status === 201) {
        if (response.data.message === "인증 성공") {
          setIsEmailVerified(true);
          setAuthError(t("인증이 되었습니다."));
          setIsSuccess(true);
          setCountdown(null);
        } else if (response.data.message === "인증 실패") {
          setAuthError(t("인증코드를 다시 확인해주세요."));
          setIsSuccess(false);
        }
      }

      const timerMessage = validateAuthCodeTimer(isTimerExpired);
      if (timerMessage) {
        setAuthError(timerMessage);
        setIsSuccess(false);
      }

      const emailMessage = validateEmailVerification(isEmailVerified);
      if (emailMessage) {
        setAuthError(emailMessage);
        setIsSuccess(false);
      }
    } catch (error) {
      setIsLoading(false);

      console.error("인증 실패:", error);
      setAuthError(t("인증코드를 다시 확인해주세요."));
      setIsSuccess(false);
    }
  };

  const handleNicknameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setNickname(newValue);
    const errorMessage = await handleCheckNickname(newValue);
    setNicknameError(t(errorMessage));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);

    const errorMessage = t(validateEmail(newValue));
    setEmailError(errorMessage);

    if (errorMessage) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setPasswordError(t(validatePassword(newValue)));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    setConfirmPasswordError(
      t(validatePasswordConfirmation(password, newValue))
    );
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setBio(newValue);
    setBioError(t(validateBio(newValue)));
  };

  const handleNicknameDupCheck = async () => {
    const errorMessage = t(await handleCheckNickname(nickname));

    try {
      const response = await checkNickname(nickname);
      if (response.isDuplicate) {
        setNicknameError(t("닉네임이 중복되었습니다."));
        setIsNicknameValid(false);
        setIsNicknameChecked(false);
      } else {
        setNicknameError(errorMessage);
        setIsNicknameValid(errorMessage === t("닉네임을 사용할 수 있습니다."));
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error("닉네임 중복 확인 중 오류 발생:", error);
      setNicknameError(t("닉네임 중복 확인을 실패했어요."));
      setIsNicknameValid(false);
      setIsNicknameChecked(false);
    }
  };

  const handleLanguageChange = () => {
    changeLanguage();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goToMain = () => {
    navigate("/");
  };
  return (
    <ST.Wrapper>
      <ST.Icon onClick={goToMain}>
        <img src={textlogo} alt="로컬밍글" />
      </ST.Icon>
      <ST.Language onClick={handleLanguageChange}>
        <button onClick={handleLanguageChange}>
          {(() => {
            switch (currentLang) {
              case "ko":
                return <img src={kologo} alt="Korean" />;
              case "jp":
                return <img src={jplogo} alt="Japanese" />;
              default:
                return <img src={enlogo} alt="English" />;
            }
          })()}
        </button>
      </ST.Language>
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
        <ST.ValidationColor
          isValid={
            isNicknameValid === null
              ? null
              : isNicknameValid ||
                nicknameError === "닉네임을 사용할 수 있습니다."
          }
        >
          {nicknameError}
        </ST.ValidationColor>
      </ST.LabelWrapper>

      <ST.LabelWrapper>
        <label>{t("이메일")}</label>
        <div>
          <input type="email" value={email} onChange={handleEmailChange} />
          {emailSent ? (
            <>
              <ST.EmailCodeConfirmInput
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder={t("인증코드")}
              />
              <ST.EmailCodeConfirmBtn onClick={handleAuth}>
                {t("인증")}
              </ST.EmailCodeConfirmBtn>
            </>
          ) : (
            <>
              <ST.DupCheckButtonWrap>
                <ST.DupCheckButton
                  onClick={handleSendEmail}
                  disabled={!isEmailValid}
                >
                  {t("인증코드 보내기")}
                </ST.DupCheckButton>
              </ST.DupCheckButtonWrap>
              {authError && (
                <ST.ErrorMessageJoin>{authError}</ST.ErrorMessageJoin>
              )}
            </>
          )}
        </div>
        <ST.ValidationColor isValid={isEmailValid || isEmailVerified}>
          {isEmailVerified ? authError : emailError}
        </ST.ValidationColor>
        <ST.CountdownText>
          {countdown !== null && (
            <span>
              {t("남은 시간")} {Math.floor(countdown / 60)} {t("분")}{" "}
              {countdown % 60} {t("초")}
            </span>
          )}
        </ST.CountdownText>
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
