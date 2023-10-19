import { axiosInstance } from "../api/axiosInstance";
import axios from "axios";
import {
  setAccessToken,
  setRefreshToken,
  getNewAccessToken,
} from "../util/token";
import { isTokenExpired } from "../util/token";
import { uploadInstance } from "./axiosInstance.tsx";

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
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: {
        password,
      },
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return response.data;
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

// 이미지 수정
export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log("formData", formData.get("file"));
  try {
    const response = await uploadInstance.post("users/upload", formData);
    if (response.status === 201) {
      const imageUrl = response.data.profileImgURL;
      return imageUrl;
    } else {
      console.error("이미지 업로드 실패:", response);
      return null;
    }
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    throw error;
  }
};

// 유저이미지 get
export const getUserProfileImage = async (accessToken: string) => {
  try {
    const response = await axiosInstance.get("users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.UserDetail[0].profileImg;
  } catch (error) {
    console.error("프로필 이미지를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 회원정보 수정
export const updateUserInfo = async (
  id: string,
  nickname: string,
  intro: string,
  password: string,
  confirmPassword: string,
  nicknameChanged: boolean
) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("액세스 토큰이 없습니다.");
    }
    console.log("함수 내부 intro:", intro);
    const response = await axiosInstance.patch(
      `users/${id}`,
      {
        nickname,
        intro,
        password,
        confirmPassword,
        nicknameChanged,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw error.response ? error.response.data : error;
    } else {
      throw error;
    }
  }
};

// 닉네임 중복 확인
export const checkNickname = async (nickname: string) => {
  try {
    const response = await axiosInstance.post("users/checkNickname", {
      nickname,
    });
    return response.data;
  } catch (error) {
    console.error("닉네임 중복 확인 중 오류 발생:", error);
    throw error;
  }
};

// 이메일 중복 확인
export const checkEmail = async (email: string) => {
  try {
    const response = await axiosInstance.post("users/checkEmail", { email });
    return response.data;
  } catch (error) {
    console.error("이메일 중복 확인 중 오류 발생:", error);
    throw error;
  }
};

// 글목록 삭제
export const deleteEvent = async (eventId: number) => {
  try {
    const response = await axiosInstance.delete(`events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("글목록 삭제 중 오류 발생:", error);
    throw error;
  }
};

// 글목록 불러오기
export const getEvents = async (userId: number) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("액세스 토큰이 없습니다.");
    }
    const response = await axiosInstance.get(`users/${userId}/hostedEvents`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("글목록 불러오기 중 오류 발생:", error);
    throw error;
  }
};

// 참가한 이벤트 목록 불러오기
interface IEvent {
  eventName: string;
  eventDate: string;
  eventLocation: string;
  category: string;
  createdAt: string;
  eventId: number;
}

interface IGuestEvent {
  Event: IEvent;
}

export const getJoinedEvents = async (userId: number) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("액세스 토큰이 없습니다.");
    }
    const response = await axiosInstance.get(`users/${userId}/joinedEvents`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("서버에서 반환된 데이터:", response.data);
    if (
      response.data &&
      response.data.GuestEvents &&
      Array.isArray(response.data.GuestEvents)
    ) {
      return response.data.GuestEvents.map((guestEvent: IGuestEvent) => {
        const event = guestEvent.Event;
        return {
          eventName: event.eventName,
          eventDate: event.eventDate
            ? event.eventDate.slice(0, 10)
            : "날짜 없음",
          category: event.category,
          createdAt: event.createdAt,
          eventId: event.eventId,
        };
      });
    } else {
      throw new Error("올바르지 않은 데이터 형식입니다.");
    }
  } catch (error) {
    console.error("참가한 이벤트 목록 불러오기 중 오류 발생:", error);
    throw error;
  }
};

// 이벤트 참석 취소
export const cancelParticipation = async (eventId: number) => {
  console.log("cancelParticipation 함수 호출됨!");
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("액세스 토큰이 없습니다.");
    }

    const response = await axiosInstance.put(
      `events/${eventId}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("API 응답:", response.data);

    if (
      response.status === 200 &&
      response.data.message === `${eventId}번 모임 참석 취소!`
    ) {
      console.log("참석 취소 성공!");
      return response.data;
    } else {
      console.error("참석 취소 실패:", response);
      return null;
    }
  } catch (error) {
    console.error("참석 취소 중 오류 발생:", error);
    throw error;
  }
};
