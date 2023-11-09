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

// 채팅 리스트 컴포넌트 내부에서 사용할 메시지 데이터를 위한 타입
export type ClientMessageData = {
  message: string;
  nickname: string;
  profileImg: string;
  time: string;
  roomId: number;
  userId: number;
};

// 서버에서 받은 사용자 정보를 위한 타입
export type UserFromServer = {
  userId: number;
  nickname: string;
  profileImg: string;
};

// 서버에서 받은 채팅 메시지를 위한 타입
export type MessageFromServer = {
  roomId: number;
  chat: string;
  userList: UserFromServer[];
};
