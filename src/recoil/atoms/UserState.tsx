import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage, // 세션 스토리지를 사용하고 싶다면 sessionStorage
}); // 로컬 스토리지를 사용하고 싶다면 localStorage

type UserType = {
  userId: number | null;
};

export const userState = atom<UserType>({
  key: "userState",
  default: {
    userId: null,
  },
  effects_UNSTABLE: [persistAtom], // 여기 추가!
});

export const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
  effects_UNSTABLE: [persistAtom], // 여기도 추가!
});
