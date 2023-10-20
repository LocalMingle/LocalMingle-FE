import { atom, useRecoilState } from "recoil";

// 시/도 옵션 샐랙터
export const sidoOptionsState = atom<string[]>({
  key: 'sidoOptionsState',
  default: [],
});
export const useSidoOptions = () => {
  return useRecoilState(sidoOptionsState);
};

// 카테고리 옵션 샐랙터
export const categoryOptionsState = atom<string[]>({
  key: 'categoryOptionsState',
  default: [],
});
export const useCategoryOptions = () => {
  return useRecoilState(categoryOptionsState);
};