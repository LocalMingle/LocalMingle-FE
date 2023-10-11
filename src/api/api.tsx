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
