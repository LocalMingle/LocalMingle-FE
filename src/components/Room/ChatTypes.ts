export type MessageData = {
  message: string;
  nickname: string;
  profileImg: string;
  time: string;
  roomId: number;
};

export type EventDetailResponse = {
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
