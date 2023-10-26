import React from "react";
import * as St from "./STSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../../util/Locales/useLanguage";

interface SearchProps {
  onSearch: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = () => {
  const { t } = useLanguage();
  const [keyword, setKeyword] = React.useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(keyword);
    }
  }

  return (
    <St.SearchBar onChange={handleInputChange} onKeyDown={handleKeyDown}>
      <div>
        <St.SearchInput
          placeholder={t("제목 및 글 내용을 검색해 보세요.")}
        ></St.SearchInput>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ color: "#646464" }}
        />
      </div>
    </St.SearchBar>
  );
};

export default Search;
