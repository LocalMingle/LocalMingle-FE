import i18n from "i18next";
// 초기화 도와주는 함수
// React와 i18next를 연동하기 위한 부분
import { initReactI18next } from "react-i18next";

import translationEn from "./lngFile/en.json";
import translationKo from "./lngFile/ko.json";
import translationJp from "./lngFile/jp.json";

// 다국어 리소스 객체를 정의
const resources = {
  en: { translation: translationEn },
  ko: { translation: translationKo },
  jp: { translation: translationJp },
};

// 사용자의 브라우저 언어 설정을 확인하고, 설정이 없으면 기본값으로 사용할 언어를 결정
const userLanguage = window.navigator.language.split("-")[0]; // 'ko-KR' 같은 값을 'ko'로 변환

i18n.use(initReactI18next).init({
  resources,
  // 사용할 기본 언어 설정
  lng: localStorage.getItem("language") || userLanguage || "en",
  // 만약에 해당 언어 리소스없을경우에 사용할 언어
  fallbackLng: "ko",
  // 디버그 모드를 활성화, 디버그 모드에서는 i18n과 관련된 로그와 경고를 출력
  // debug: true,
  // 번역 키(key)에서 구분자를 사용하지 않도록 설정, 이는 번역 키를 더 직관적으로 사용하기 위한 설정
  keySeparator: ".", // or true
  // HTML 태그나 특수 문자를 이스케이프하지 않도록 한다.
  interpolation: {
    escapeValue: false,
  },
  // Suspense를 사용하지 않도록 한다.
  react: {
    useSuspense: false,
  },
});

export default i18n;
// languages 배열은 언어 코드를 담은 상수 배열로서, as const를 통해 각 언어 코드가 리터럴 타입으로 추론
export const languages = ["en", "ko", "jp"] as const;

// Languages 타입은 'en' 또는 'jp', 'ko'라는 언어 코드 중 하나만을 나타내는 유니온 타입으로 정의됩니다.
export type Languages = (typeof languages)[number];
