import jwt_decode from "jwt-decode";
import axios from "axios";
import { logoutUser } from "../api/api";

interface DecodedToken {
  exp: number;
}

// 액세스 토큰 저장 함수
export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

// 리프레시 토큰 저장 함수
export const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

// 액세스 토큰과 리프레시 토큰 동시 저장 함수
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// 액세스 토큰 가져오기 함수
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

// 리프레시 토큰 가져오기 함수
export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

// 토큰 만료 확인
export const isTokenExpired = (token: string): boolean => {
  const decodedToken = jwt_decode<DecodedToken>(token);
  const expirationTime = decodedToken.exp * 1000; // JWT 토큰의 exp는 초단위라서 밀리초로 변환
  const currentTime = Date.now();
  return expirationTime < currentTime;
};

// 새로운 액세스 토큰 받아오기
export const getNewAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    console.log("Refresh Token:", refreshToken); // 리프레시 토큰 출력

    if (!refreshToken) return null;

    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_URL}users/refresh`,
      {
        refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    console.log("Response:", response); // 서버 응답 출력

    if (response.status === 401) {
      console.log("Refresh Token has expired."); // 리프레시 토큰 만료 로그
      logoutUser(); // 로그아웃
      window.location.href = "/login"; // 로그인 페이지로 리다이렉트
      return null;
    }

    const newAccessToken = response.data.accessToken;
    console.log("New Access Token:", newAccessToken); // 새로운 액세스 토큰 출력
    setAccessToken(newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Error:", error); // 에러 출력
    return null;
  }
};
