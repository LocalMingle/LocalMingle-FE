/* eslint-disable react-refresh/only-export-components */
import { axiosInstance } from "../api/axiosInstance";
import {
  setAccessToken,
  setRefreshToken,
  getNewAccessToken,
} from "../util/token";
import { isTokenExpired } from "../util/token";
import { uploadInstance } from "../api/axiosInstance";

// 엑세스 토큰 만료시 리프레쉬토큰 이용해서 새로운 엑세스 토큰 발급
export const checkAndRefreshTokenIfNeeded = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const isExpired = isTokenExpired(accessToken);
    if (isExpired) {
      const newToken = await getNewAccessToken();
      if (newToken) {
        setAccessToken(newToken);
      } else {
        window.location.href = "/login";
      }
    }
  }
};

// 로그인
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post(`/users/login`, {
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

// 이메일 인증코드 보내기
export const sendVerificationEmail = (
  email: string,
  subject: string,
  html: string
) => {
  return axiosInstance.post("mail/send", {
    to: email,
    subject: subject,
    html: html,
  });
};

// 이메일 인증코드 인증
export const verifyEmailCode = (code: number) => {
  return axiosInstance.post("mail/verify", {
    code: code,
  });
};

// 회원 탈퇴
export const deleteUser = async (password: string) => {
  try {
    const response = await axiosInstance.delete(`/users/withdrawal`, {
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
  const response = await axiosInstance.get("/events");
  return response.data;
};

// 게시글 삭제
export const deletePost = async (postId: string) => {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);
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
  const { data } = await axiosInstance.patch(`/event/${eventId}`, post);
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
  const { data } = await axiosInstance.get(`/event/${eventId}`);
  return data.data;
};

// 이미지 업로드
export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log("formData", formData.get("file"));
  try {
    const response = await uploadInstance.post("/users/upload", formData);
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
export const getUserProfileImage = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data.UserDetail[0].profileImg;
  } catch (error) {
    console.error("프로필 이미지를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 닉네임 중복 확인
export const checkNickname = async (nickname: string) => {
  try {
    const response = await axiosInstance.post("/users/checkNickname", {
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
    const response = await axiosInstance.post("/users/checkEmail", { email });
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
    const response = await axiosInstance.get(`/users/${userId}/hostedEvents`, {
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
    const response = await axiosInstance.get(`/users/${userId}/joinedEvents`, {
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

// 이벤트 상세 정보 조회
interface EventDetailResponse {
  event: {
    eventId: number;
    eventName: string;
    maxSize: number;
    eventDate: Date;
    signupStartDate: Date;
    signupEndDate: Date;
    eventImg: string;
    eventLocation: string;
    location_City: string;
    location_District: string;
    content: string;
    category: string;
    isVerified: "yes" | "no";
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: {
      Viewlogs: number;
    };
  };
  guestList: number;
  hostUser: Array<{
    userDetailId: number;
    UserId: number;
    nickname: string;
    intro: string;
    profileImg: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  guestUser: GuestUser[][];
  isJoin: boolean;
}

type GuestUser = {
  userDetailId: number;
  UserId: number;
  nickname: string;
  intro: string;
  profileImg: string;
  userLocation: null;
  createdAt: Date;
  updatedAt: Date;
};

export type { EventDetailResponse };

export const getEventDetail = async (
  eventId: number
): Promise<EventDetailResponse> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("액세스 토큰이 없습니다.");
    }

    const response = await axiosInstance.get<EventDetailResponse>(
      `/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("이벤트 상세 정보 조회 중 오류 발생:", error);
    throw error;
  }
};

// 회원 정보 수정
interface UpdateUserInfoParams {
  nickname: string;
  intro: string;
  email: string;
  nameChanged: boolean;
  userLocation: string;
}

interface UpdateUserInfoResponse {
  message: string;
}

export const updateUserProfile = async (
  params: UpdateUserInfoParams
): Promise<UpdateUserInfoResponse> => {
  try {
    const response = await axiosInstance.patch<UpdateUserInfoResponse>(
      "/users/update",
      params
    );
    return response.data;
  } catch (error) {
    console.error("회원 정보 업데이트 실패 😢", error);
    throw error;
  }
};

// 패스워드 업데이트 API
export const updatePassword = async (newPassword: string) => {
  try {
    const response = await axiosInstance.patch("/users/updatePassword", {
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("패스워드 업데이트 실패 😢", error);
    throw error;
  }
};

// 이벤트 참가 신청
export const joinEvent = async (eventId: number) => {
  console.log("joinEvent 함수 호출됨!");

  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("액세스 토큰이 없습니다.");
    }

    const response = await axiosInstance.post(
      `/events/${eventId}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("API 응답:", response.data);

    if (response.status === 201) {
      if (response.data.confirm) {
        console.log(`${response.data.message} 참가 확정!`);
        return "confirmed";
      } else {
        console.log(`${response.data.message} 참가 대기중!`);
        return "pending";
      }
    }

    console.error("참가 신청 실패:", response);
    return null;
  } catch (error) {
    console.error("참가 신청 중 오류 발생:", error);
    throw error;
  }
};

// 이벤트 참석 취소
export const cancelEventJoin = async (eventId: number) => {
  console.log("cancelEventJoin 함수 호출됨!");

  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("액세스 토큰이 없습니다.");
    }

    const response = await axiosInstance.delete(`/events/${eventId}/join`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("API 응답:", response.data);

    if (response.status === 200) {
      if (!response.data.confirm) {
        console.log(`${response.data.message} 참가 취소 성공!`);
        return "cancelled";
      }
    }

    console.error("참가 취소 실패:", response);
    return null;
  } catch (error) {
    console.error("참가 취소 중 오류 발생:", error);
    throw error;
  }
};
