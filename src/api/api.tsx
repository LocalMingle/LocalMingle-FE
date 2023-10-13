import { axiosInstance } from "./axiosInstance";

// 로그인
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post(`users/login`, {
    email,
    password,
  });
  localStorage.setItem("accessToken", response.headers["authorization"]);
  localStorage.setItem(
    "refreshToken",
    response.headers["authorization_refresh"]
  );
  return response;
};

// 게시글 전체 조회
export const getPosts = async () => {
  const response = await axiosInstance.get("events");
  return response.data;
};