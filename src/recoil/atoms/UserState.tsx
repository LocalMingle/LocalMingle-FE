import { atom } from "recoil";

// 사용자 정보 관리 atom
export const userState = atom({
  key: "userState",
  default: {
    userId: null,
  },
});
