export type MessageData = {
  message: string;
  nickname: string;
  profileImg: string;
  time: string;
  roomId: number;
  userId?: number;
  hostUser?: {
    UserId: number;
  }[];
  guestUser?: {
    UserId: number;
  }[][];
  userList?: User[];
};

export type EventDetailResponse = {
  event: {
    eventId: number;
    eventName: string;
  };
  hostUser: {
    UserId: number;
    nickname: string;
    profileImg: string;
  }[];
  guestUser: {
    UserId: number;
    nickname: string;
    profileImg: string;
  }[][];
};

export type User = {
  UserId: number;
  nickname: string;
  profileImg: string;
};

export type ChatHistory = {
  roomId: number;
  chat: string;
  userList: {
    userId: number;
    nickname: string;
    profileImg: string;
  }[];
};

export type ClientMessageData = {
  message: string;
  nickname: string;
  profileImg: string;
  time: string; // 서버 측 타임스탬프가 string 타입인지 확인 필요
  roomId: number;
  userId: number;
};
