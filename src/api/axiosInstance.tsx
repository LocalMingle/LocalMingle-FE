import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getNewAccessToken } from "../util/token";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const createAxiosInstance = (headers: AxiosRequestConfig["headers"]) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL,
    headers,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
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
            Authorization: `Bearer ${newAccessToken}`,
          } as AxiosRequestConfig["headers"];
          return instance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance({
  "Content-Type": "application/json",
});
const uploadInstance = createAxiosInstance({
  "Content-Type": "multipart/form-data",
});

export { axiosInstance, uploadInstance };
