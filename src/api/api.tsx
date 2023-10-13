import { axiosInstance } from "../api/axiosInstance";
import {
  setAccessToken,
  setRefreshToken,
  getNewAccessToken,
} from "../util/token";
import { isTokenExpired } from "../util/token";

export const checkAndRefreshTokenIfNeeded = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const isExpired = isTokenExpired(accessToken);
    if (isExpired) {
      const newToken = await getNewAccessToken();
      if (newToken) {
        setAccessToken(newToken);
      } else {
        // 여기서 로그아웃 로직이나 리프레쉬 토큰도 만료되었을 때의 처리를 해주면 좋겠어
      }
    }
  }
};

// 로그인
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post(`users/login`, {
    email,
    password,
  });

  // 토큰의 키 이름에 맞게 수정
  setAccessToken(response.data.accessToken);
  setRefreshToken(response.data.refreshToken);

  return response;
};

// 로그아웃
export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// 회원 탈퇴
export const deleteUser = async () => {
  const data = await axiosInstance.delete(`users/delete`);

  // 로컬 스토리지에서 토큰 제거 (이 부분은 그대로 유지해도 됨)
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return data;
};

// 로그아웃
export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// 회원 탈퇴
export const deleteUser = async () => {
  const data = await axiosInstance.delete(`users/delete`);

  // 로컬 스토리지에서 토큰 제거 (이 부분은 그대로 유지해도 됨)
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return data;
};

// 게시글 전체 조회
export const getPosts = async () => {
  const response = await axiosInstance.get("events");
  return response.data;
};