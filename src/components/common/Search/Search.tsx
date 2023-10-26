import React from "react";
import * as St from "./STSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../../util/Locales/useLanguage";
import axios, { AxiosInstance } from "axios";

const Search: React.FC = () => {
  const { t } = useLanguage();
  const accessToken = localStorage.getItem("accessToken");
  const [keyword, setKeyword] = React.useState<string>('');

  // AxiosInstance & API 설정
  const customAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL,
    headers: {
      Authorization: `${accessToken}`,
    },
  });
  const searchAPI = {
    searchApi: () => customAxios.get("/search", {
      params: {
        query : keyword
      }
    }),
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const response = await searchAPI.searchApi()
      .then((response) => {
        console.log('게시글 검색', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('게시글 검색 실패', error);
        throw error;
      });
      return response;
    }
  }

  return (
    <St.SearchBar >
      <div>
        <St.SearchInput
          placeholder={t("제목 및 글 내용을 검색해 보세요.")}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
