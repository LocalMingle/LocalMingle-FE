import React, { useState, ChangeEvent } from "react";
import * as St from "./STUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  UpdateValidateNickname,
  UpdateValidatePassword,
  UpdateValidatePasswordConfirmation,
} from "../../../util/validation";

const UserInfo: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    "https://pbs.twimg.com/profile_images/848505006722392065/qD5R22bp_400x400.jpg"
  );
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
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
    <St.Container>
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
        <St.Input
          type="text"
          id="nickname"
          value={nickname}
          onChange={handleNicknameChange}
        />
        <St.ErrorMessageJoin>{nicknameError}</St.ErrorMessageJoin>
      </St.InputContainer>

      <St.InputContainer>
        <St.Label htmlFor="password">비밀번호</St.Label>
        <St.Input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <St.ErrorMessageJoin>{passwordError}</St.ErrorMessageJoin>
        <St.EyeToggleButton onClick={togglePasswordVisibility}>
          {showPassword ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </St.EyeToggleButton>
      </St.InputContainer>

      <St.InputContainer>
        <St.Label htmlFor="passwordConfirm">비밀번호 확인</St.Label>
        <St.Input
          type="password"
          id="passwordConfirm"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <St.ErrorMessageJoin>{confirmPasswordError}</St.ErrorMessageJoin>
      </St.InputContainer>

      <St.InputContainer>
        <St.Label htmlFor="introduce">한 줄 자기소개</St.Label>
        <St.Input type="text" id="introduce" />
      </St.InputContainer>

      <St.InputContainer>
        <St.Label htmlFor="location">현재 위치</St.Label>
        <St.Input
          type="text"
          id="location"
          readOnly
          value="서울특별시 강남구"
        />
      </St.InputContainer>

      <St.SubmitButton>수정</St.SubmitButton>
    </St.Container>
  );
};

export default UserInfo;
