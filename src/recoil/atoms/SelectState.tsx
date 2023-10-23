import { atom } from "recoil";

// 위치인증 여부 샐랙터
export const locationState = atom<string[]>({
  key: 'locationState',
  default: [],
});

// 시/도 옵션 샐랙터
export const sidoOptionsState = atom<string[]>({
  key: 'sidoOptionsState',
  default: [],
});

// 구/군 옵션 샐랙터
export const gugunOptionsState = atom<string[]>({
  key: 'gugunOptionsState',
  default: [],
});

// 카테고리 옵션 샐랙터
export const categoryOptionsState = atom<string[]>({
  key: 'categoryOptionsState',
  default: [],
});