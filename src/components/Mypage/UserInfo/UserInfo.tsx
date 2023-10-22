import React, { useState, useEffect, ChangeEvent } from "react";
import * as St from "./STUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  UpdateValidateNickname,
  UpdateValidatePassword,
  UpdateValidatePasswordConfirmation,
  handleCheckNickname,
} from "../../../util/validation";
import {
  uploadProfileImage,
  getUserProfileImage,
  updateUserInfo,
} from "../../../api/api";
import { axiosInstance } from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import { useLanguage } from "../../../util/Locales/useLanguage";

const UserInfo: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string>();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [intro, setIntro] = useState("");
  const [initialNickname, setInitialNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const { t } = useLanguage();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const profileImgURL = await getUserProfileImage();
          setProfileImage(profileImgURL);
        }
      } catch (error) {
        console.error("프로필 이미지를 불러오는 중 오류 발생:", error);
      }
    };

    fetchProfileImage();
  }, [profileImage]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("토큰이 없습니다.");
          return;
        }
        const response = await axiosInstance.get("users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (
          response &&
          response.data &&
          response.data.UserDetail &&
          response.data.UserDetail.length > 0
        ) {
          const userDetail = response.data.UserDetail[0];
          setNickname(userDetail.nickname);
          setInitialNickname(userDetail.nickname);
          setIntro(userDetail.intro ? userDetail.intro : "");
        }
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameChanged = nickname !== initialNickname;

    if (!password) {
      toast.error("비밀번호를 입력해주세요.", {
        className: "toast-error toast-container",
      });
      return;
    }

    if (password && password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      console.log("사용자 ID를 가져오는 중...");
      const userId = localStorage.getItem("userId");
      console.log("사용자 ID:", userId);
      if (userId) {
        console.log("회원 정보를 업데이트하는 중...");
        const response = await updateUserInfo(
          userId,
          nickname,
          intro,
          password,
          confirmPassword,
          nameChanged
        );

        console.log("업데이트 응답:", response);
        console.log(response.message);
        setPassword("");
        setConfirmPassword("");
      } else {
        console.error("사용자 ID를 불러오지 못했습니다.");
      }
      toast.success("수정이 완료되었습니다.", {
        className: "toast-success toast-container",
      });
      setNicknameError("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadedImage = await uploadProfileImage(file);
        setProfileImage(uploadedImage.profileImgURL);
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
      }
    }
  };

  const handleCheckNicknameClick = async () => {
    const errorMessage = await handleCheckNickname(nickname);
    setNicknameError(errorMessage);
    setIsNicknameValid(errorMessage === "닉네임을 사용할 수 있습니다.");
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNickname(newValue);
    setNicknameError(UpdateValidateNickname(newValue));
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setPasswordError(UpdateValidatePassword(newValue));
  };
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    setConfirmPasswordError(
      UpdateValidatePasswordConfirmation(password, newValue)
    );
  };
  return (
    <St.MyPageContainer>
      <St.MyPageWrap>
        <St.ImageContainer>
          <St.ProfileImage src={profileImage} alt="프로필 이미지" />
          <input
            type="file"
            id="imageInput"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <St.ProfileTextButton
            onClick={() => document.getElementById("imageInput")?.click()}
          >
            {t("이미지 업로드")}
          </St.ProfileTextButton>
        </St.ImageContainer>

        <St.InputContainer>
          <St.Label htmlFor="nickname">{t("닉네임")}</St.Label>
          <div>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
            />
            <St.DupCheckButtonWrap>
              <St.DupCheckButton onClick={handleCheckNicknameClick}>
                {t("중복 체크")}
              </St.DupCheckButton>
            </St.DupCheckButtonWrap>
          </div>
          <St.ErrorMessageJoin isValid={isNicknameValid}>
            {nicknameError}
          </St.ErrorMessageJoin>
        </St.InputContainer>

        <St.InputContainer>
          <St.Label htmlFor="introduce">{t("한줄 자기소개")}</St.Label>
          <input
            type="text"
            id="introduce"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </St.InputContainer>

        <St.InputContainer>
          <St.Label htmlFor="location">{t("위치 정보")}</St.Label>
          <input
            type="text"
            id="location"
            readOnly
            value={t("서울특별시 강남구")}
          />
        </St.InputContainer>

        <St.InputContainer>
          <St.Label htmlFor="password">{t("비밀번호")}</St.Label>
          <St.EyleToggleWrap>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <St.EyeToggleButton onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </St.EyeToggleButton>
          </St.EyleToggleWrap>
          <St.ErrorMessagePassword>{passwordError}</St.ErrorMessagePassword>
        </St.InputContainer>

        <St.InputContainer>
          <St.Label htmlFor="passwordConfirm">{t("비밀번호 확인")}</St.Label>
          <input
            type="password"
            id="passwordConfirm"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <St.ErrorMessagePassword>
            {confirmPasswordError}
          </St.ErrorMessagePassword>
        </St.InputContainer>

        <St.SubmitButtonWrap>
          <St.SubmitButton type="button" onClick={handleUpdate}>
            {t("수정")}
          </St.SubmitButton>
        </St.SubmitButtonWrap>
      </St.MyPageWrap>
    </St.MyPageContainer>
  );
};
export default UserInfo;
