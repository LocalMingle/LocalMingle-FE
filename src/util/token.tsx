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

  const now = new Date();
  const expiresIn = new Date(now.getTime() + 5000).getTime(); // 5초 뒤 만료
  localStorage.setItem("accessTokenExpiresAt", expiresIn.toString());
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
    if (!refreshToken) return null;

    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_URL}users/refresh`,
      {
        refreshToken,
      }
    );

    if (response.status === 401) {
      // 만약 리프레쉬 토큰이 만료되었다면
      logoutUser(); // 로그아웃
      window.location.href = "/login"; // 로그인 페이지로 리다이렉트
      return null;
    }

    const newAccessToken = response.data.accessToken;
    setAccessToken(newAccessToken);

    return newAccessToken;
  } catch (error) {
    return null;
  }
};
