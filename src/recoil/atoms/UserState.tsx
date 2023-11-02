import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage, // 세션 스토리지를 사용하고 싶다면 sessionStorage
}); // 로컬 스토리지를 사용하고 싶다면 localStorage

type UserType = {
  userId: number | null;
};
// 현재 로그인한 사용자의 userId 정보를 저장
export const userState = atom<UserType>({
  key: "userState",
  default: {
    userId: null,
  },
  effects_UNSTABLE: [persistAtom],
});

// 사용자가 로그인했는지 여부를 불린 값
export const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
