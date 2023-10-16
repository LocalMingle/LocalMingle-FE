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
        // 여기서 로그아웃 로직이나 리프레쉬 토큰도 만료되었을 때의 처리요망
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
export const deleteUser = async (password: string) => {
  try {
    const response = await axiosInstance.delete(`users/withdrawal`, {
      data: {
        password,
      },
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return response;
  } catch (error) {
    console.error("회원 탈퇴에 실패했어요!", error);
    throw error;
  }
};

// 게시글 전체 조회
export const getPosts = async () => {
  const response = await axiosInstance.get("events");
  return response.data;
};

// 게시글 삭제
export const deletePost = async (postId: string) => {
  const { data } = await axiosInstance.delete(`posts/${postId}`);
  return data;
};

// 게시글 수정
interface PostUpdate {
  eventName: string;
  maxSize: number;
  eventDate: Date;
  signupStartDate: Date;
  signupEndDate: Date;
  eventLocation: string;
  content: string;
  category: string;
  isVerified: "yes" | "no";
}

export const updatePost = async (eventId: number, post: PostUpdate) => {
  const { data } = await axiosInstance.patch(`event/${eventId}`, post);
  return data;
};

// 게시글 조회
interface PostDetail {
  eventId: number;
  eventName: string;
  maxSize: number;
  eventDate: Date;
  signupStartDate: Date;
  signupEndDate: Date;
  eventLocation: string;
  content: string;
  category: string;
  isVerified: "yes" | "no";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const getOnePost = async (eventId: number): Promise<PostDetail> => {
  const { data } = await axiosInstance.get(`event/${eventId}`);
  return data.data;
};
