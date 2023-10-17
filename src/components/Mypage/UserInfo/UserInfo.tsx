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

const UserInfo: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    "https://pbs.twimg.com/profile_images/848505006722392065/qD5R22bp_400x400.jpg"
  );
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [intro, setIntro] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const profileImgURL = await getUserProfileImage(accessToken);
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
          setIntro(userDetail.intro);
        }
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

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
          confirmPassword
        );

        console.log("업데이트 응답:", response);
        console.log(response.message);

        setPassword("");
        setConfirmPassword("");
      } else {
        console.error("사용자 ID를 불러오지 못했습니다.");
      }
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
    <St.UserInfoContainer>
      <St.UserInfoWrap>
        
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
            이미지 업로드
          </St.ProfileTextButton>
        </St.ImageContainer>

        <St.InputContainer>
          <St.Label htmlFor="nickname">닉네임</St.Label>
          <div>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
            />
            <St.DupCheckButtonWrap>
              <St.DupCheckButton onClick={handleCheckNicknameClick}>
                중복 체크
              </St.DupCheckButton>
            </St.DupCheckButtonWrap>
          </div>
          <St.ErrorMessageJoin>{nicknameError}</St.ErrorMessageJoin>
        </St.InputContainer>

        <St.InputContainer>
          <St.Label htmlFor="introduce">한 줄 자기소개</St.Label>
          <input
            type="text"
            id="introduce"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </St.InputContainer>

        <St.InputContainer>
          <St.Label htmlFor="location">위치 정보</St.Label>
          <input
            type="text"
            id="location"
            readOnly
            value="서울특별시 강남구"
          />
        </St.InputContainer>

        <St.InputContainer>
          <St.Label htmlFor="password">비밀번호</St.Label>
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
          <St.ErrorMessageJoin>{passwordError}</St.ErrorMessageJoin>
        </St.InputContainer>

        <St.InputContainer>
          <St.Label htmlFor="passwordConfirm">비밀번호 확인</St.Label>
          <input
            type="password"
            id="passwordConfirm"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        <St.ErrorMessageJoin>{confirmPasswordError}</St.ErrorMessageJoin>
        </St.InputContainer>

        <St.SubmitButtonWrap>
          <St.SubmitButton type="button" onClick={handleUpdate}>
            수정
          </St.SubmitButton>
        </St.SubmitButtonWrap>

      </St.UserInfoWrap>
    </St.UserInfoContainer>
  );
};
export default UserInfo;
