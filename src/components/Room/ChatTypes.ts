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
