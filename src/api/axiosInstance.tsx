import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getNewAccessToken } from "../util/token";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 엑세스 토큰 만료시 리프레시 토큰 이용해서 새로운 엑세스 토큰 받아오는 코드!
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken: string | null = await getNewAccessToken();
      if (newAccessToken) {
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: newAccessToken,
        };
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
