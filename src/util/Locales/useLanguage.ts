import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "../../util/Locales/i18n";

const languages: Languages[] = ["ko", "en", "jp"];

interface UseLanguageReturnType {
  currentLang: Languages;
  t: ReturnType<typeof useTranslation>["t"];
  changeLanguage: () => void;
}

export const useLanguage = (): UseLanguageReturnType => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<Languages>(
    (localStorage.getItem("language") as Languages) || "ko"
  );

  const changeLanguage = (): void => {
    const nextIndex = (languages.indexOf(currentLang) + 1) % languages.length;
    const nextLang = languages[nextIndex];
    setCurrentLang(nextLang);
    i18n.changeLanguage(nextLang);
    localStorage.setItem("language", nextLang);
  };

  return { currentLang, t, changeLanguage };
};
