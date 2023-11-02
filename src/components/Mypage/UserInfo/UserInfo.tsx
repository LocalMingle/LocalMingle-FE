import React, { useState, useEffect, ChangeEvent } from "react";
import * as St from "./STUserInfo";
import toast from "react-hot-toast";
import { Button } from "../../common/Button";
import { axiosInstance } from "../../../api/axiosInstance";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  UpdateValidateNickname,
  UpdateValidatePassword,
  UpdateValidatePasswordConfirmation,
  handleCheckNickname,
  validateImageUpload,
} from "../../../util/validation";
import {
  uploadProfileImage,
  getUserProfileImage,
  updateUserProfile,
  updatePassword,
} from "../../../api/api";

const UserInfo: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string>();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setInitialNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [userLocation, setUserLocation] = useState<string>("");

  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [nameChanged, setNameChanged] = useState(false);

  const { t } = useLanguage();

  /**
   * @description myLocation
   * 나의 위치 정보 가져오기
   */
  const latitude = 37.3347561;
  const longitude = 126.9519579;

  const myLocation = async () => {
    try {
      const response = await axiosInstance.get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: "KakaoAK c833a8561bc180927375b89e710fac02",
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log("위치 정보 불러오기 실패", error);
    }
  };
  myLocation();

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

  const handleUpdate = async () => {
    try {
      const response = await updateUserProfile({
        nickname,
        intro,
        email: "",
        nameChanged: nameChanged,
        userLocation,
      });

      if (response.message === "회원 정보가 수정되었습니다") {
        setNickname(nickname);
      }
      toast.success(t("수정이 완료되었습니다."), {
        className: "toast-success toast-container",
      });
      setNicknameError("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      toast.error(t("수정에 실패했습니다."), {
        className: "toast-error toast-container",
      });
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateImageUpload(file);
      setImageError(validationError);
      if (validationError) {
        console.error(validationError);
        toast.error(t(validationError), {
          className: "toast-error toast-container",
        });
        return;
      }

      try {
        const uploadedImage = await uploadProfileImage(file);
        setProfileImage(uploadedImage.profileImgURL);
      } catch (error) {
        console.error(t("이미지 업로드 중 오류 발생:"), error);
      }
    }
  };

  const handlePasswordUpdate = async () => {
    if (!password) {
      toast.error(t("비밀번호를 입력해주세요."), {
        className: "toast-error toast-container",
      });
      return;
    }

    if (UpdateValidatePassword(password)) {
      toast.error(t("비밀번호 유효성 검사에 실패했습니다."), {
        className: "toast-error toast-container",
      });
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    try {
      const response = await updatePassword(password);
      if (response.message === "비밀번호가 변경되었습니다") {
        toast.success(t("비밀번호가 성공적으로 변경되었습니다!"), {
          className: "toast-success toast-container",
        });
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error: unknown) {
      console.error("비밀번호 변경 중 오류: ", error);
      if (error && typeof error === "object" && "response" in error) {
        type AxiosErrorType = {
          response?: { status?: number; data?: unknown };
        };
        const axiosError = error as AxiosErrorType;
        if (axiosError.response?.status === 400) {
          toast.error(
            t("기존 비밀번호와 같습니다", {
              className: "toast-error toast-container",
            })
          );
        }
      }
    }
  };

  const handleCheckNicknameClick = async () => {
    if (!isNicknameValid) {
      setNicknameError(t("닉네임이 유효하지 않습니다."));
      return;
    }

    const errorMessage = t(await handleCheckNickname(nickname));
    setNicknameError(errorMessage);

    if (errorMessage === t("닉네임을 사용할 수 있습니다.")) {
      setIsNicknameValid(true);
      setNameChanged(true);
    } else {
      setIsNicknameValid(false);
      setNameChanged(false);
    }
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNickname(newValue);

    const errorMessage = UpdateValidateNickname(newValue);
    if (errorMessage) {
      setNicknameError(t(errorMessage));
      setIsNicknameValid(false);
    } else {
      setNicknameError("");
      setIsNicknameValid(true);
    }
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setPasswordError(t(UpdateValidatePassword(newValue)));
  };
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    setConfirmPasswordError(
      t(UpdateValidatePasswordConfirmation(password, newValue))
    );
  };
  return (
    <St.MyPageContainer>
      <St.MyPageWrap>
        <St.GroupedInputContainer>
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
            {imageError && (
              <St.ErrorMessageImage>{imageError}</St.ErrorMessageImage>
            )}
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
              readOnly
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              style={{ backgroundColor: "#f0f0f0" }}
            />
          </St.InputContainer>
          <St.SubmitButtonWrap>
            <Button onClick={handleUpdate}>{t("회원정보 수정")}</Button>
          </St.SubmitButtonWrap>
        </St.GroupedInputContainer>
        <St.GroupedInputContainer>
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
            <Button onClick={handlePasswordUpdate}>{t("비밀번호 수정")}</Button>
          </St.SubmitButtonWrap>
        </St.GroupedInputContainer>
      </St.MyPageWrap>
    </St.MyPageContainer>
  );
};
export default UserInfo;
