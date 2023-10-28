import React from "react";
import * as St from "./STSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../../util/Locales/useLanguage";

const Search: React.FC = () => {
  const { t } = useLanguage();

  return (
    <St.SearchBar>
      <div>
        <St.SearchInput
          placeholder={t("제목 및 글 내용을 검색해 보세요.")}
        ></St.SearchInput>
        <p>
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
