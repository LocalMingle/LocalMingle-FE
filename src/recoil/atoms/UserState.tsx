import { atom } from "recoil";

type UserType = {
  userId: number | null;
};

export const userState = atom<UserType>({
  key: "userState",
  default: {
    userId: null,
  },
});

export const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
});
