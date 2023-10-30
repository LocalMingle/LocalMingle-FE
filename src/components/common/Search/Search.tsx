import React, { useState } from "react";
import * as St from "./STSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../../util/Locales/useLanguage";
import toast from "react-hot-toast";

interface SearchProps {
  onSearch: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ( {onSearch} ) => {
  const { t } = useLanguage();
  const [keyword, setKeyword] = useState<string>("");

  const searchCards = () => {
    // 빈칸 입력시 유효성 검사
    if (keyword.length == 0 || keyword == null || keyword == undefined || keyword == "") {
      toast.error(t("검색어를 입력해주세요!"));
      return;
    }

    onSearch(keyword);
    console.log('입력된 키워드: ', keyword);
  }

  return (
    <St.SearchBar>
      <div>
        <St.SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={t("제목 및 글 내용을 검색해 보세요.")}
        ></St.SearchInput>
        <p onClick={searchCards}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#646464" }}
          />
        </p>
      </div>
    </St.SearchBar>
  );
};

export default Search;
