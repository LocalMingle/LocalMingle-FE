import React, { useState, useEffect } from "react";
import * as St from "./STMainPage";
import Banner from "../common/Banner/Banner";
import Search from "../common/Search/Search";
import Selector from "../common/Selector/Selector";
import Card from "../common/Card/Card";
import FixedButton from "../common/FixedButton/FixedButton";
import { useQuery } from "react-query";
import axios, { AxiosInstance } from "axios";
import { Spinner } from "../common/Spinner";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLanguage } from "../../util/Locales/useLanguage";
import i18n from "../../util/Locales/i18n";

const MainPage: React.FC = () => {
  const { t } = useLanguage();
  const lang = i18n.language;
  const accessToken = localStorage.getItem("accessToken");
  const [ , setSelectedVerify] = useState<string>(""); // 위치 인증 여부
  const [selectedSido, setSelectedSido] = useState<string>(t("서울특별시")); // 시도
  const [ , setSelectedGugun] = useState<string>(t("종로구")); // 구군
  const [ , setSelectedCategory] = useState<string>(""); // 카테고리;

  useEffect(() => {
    setSelectedSido(t("서울특별시"));
    setSelectedGugun(t("종로구"));
  }, [t]);

  // AxiosInstance & API 설정
  const customAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL,
    headers: {
      Authorization: `${accessToken}`,
    },
  });
  const mainAPI = {
    locationApi: () => customAxios.get("data/toss"), // 위치 인증 여부
    sidoApi: (lang: string) =>
      customAxios.get("data/city", {
        params: { lang },
      }),
    gugunApi: (sido: string, lang: string) =>
      customAxios.get("data/gu_name", {
        params: { doName: sido, lang },
      }),
    categoryApi: () => customAxios.get("data/toss"), // 카테고리
    cardListApi: () => customAxios.get("events"), // 게시글 전체 조회
  };

  // 위치 인증 여부 interface (console.log 기준)
  interface CategoryOptionsProps {
    data: {
      category: string[];
      verify: string[];
    };
  }

  // 위치 인증 여부 - DB 연동
  const { data: locationOptionsData } = useQuery<CategoryOptionsProps, Error>(
    "locationOptions",
    async () => {
      const response = await mainAPI
        .locationApi()
        .then((response) => {
          return response.data.verify;
        })
        .catch((error) => {
          console.log("위치 인증 여부 불러오기 실패", error);
          throw error;
        });
      return response;
    }
  );

  // 시/도 옵션 interface (console.log 기준)
  interface SidoOptionsProps {
    doName: string[];
  }

  // 시/도 옵션 - DB 연동
  const { data: sidoOptionsData } = useQuery<SidoOptionsProps[]>(
    ["sidoOptions", lang],
    async () => {
      const response = await mainAPI
        .sidoApi(lang)
        .then((response) => {
          return response.data.items;
        })
        .catch((error) => {
          console.log("시/도 불러오기 실패", error);
          throw error;
        });
      return response;
    }
  );
  interface GugunOptionsProps {
    guName: string[];
  }
  // 구/군 옵션 - DB 연동
  const { data: gugunOptionsData, refetch: refetchGugunOptions } = useQuery<
    GugunOptionsProps[]
  >(["gugunOptions", selectedSido, lang], async () => {
    const response = await mainAPI
      .gugunApi(selectedSido, lang)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("구/군 불러오기 실패", error);
        throw error;
      });
    return response;
  });

  useEffect(() => {
    if (selectedSido) {
      refetchGugunOptions();
    }
  }, [selectedSido, lang, refetchGugunOptions]);

  // 카테고리 옵션 - DB 연동
  const { data: categoryOptionsData } = useQuery<CategoryOptionsProps>(
    "categoryOptions",
    async () => {
      const response = await mainAPI
        .categoryApi()
        .then((response) => {
          return response.data.category;
        })
        .catch((error) => {
          console.log("카테고리 옵션 카테고리 불러오기 실패", error);
          throw error;
        });
      return response;
    }
  );

  // 게시글 전체 조회 interface (console.log 기준)
  interface CardProps {
    event: {
      category: string;
      content: string;
      createdAt: string;
      eventDate: string;
      eventId: number;
      eventLocation: string;
      eventName: string;
      isDeleted: boolean;
      isVerified: string;
      maxSize: number;
      signupEndDate: string;
      signupStartDate: string;
      updatedAt: string;
    };
    guestList: number[];
    hostUser: [
      {
        userDetailId: number;
        UserId: number;
        nickname: string;
        intro: string;
        profileImg: string;
        updatedAt: string;
      }
    ];
  }

  // 게시글 전체 조회 - DB 연동
  const { isLoading: postsLoading, data: postData } = useQuery<CardProps[]>(
    "get",
    async () => {
      const response = await mainAPI
        .cardListApi()
        .then((response) => {
          // console.log('게시글 전체조회 데이터:', response.data);
          return response.data;
        })
        .catch((error) => {
          console.log("게시글 전체조회 에러!", error);
          throw error;
        });
      return response;
    }
  );

  // 로딩 중인 경우
  if (postsLoading) return <Spinner />;

  // 데이터가 없는 경우
  if (!postData || postData.length === 0) {
    return (
      <>
        <Banner></Banner>
        <Search></Search>
        <div>앗! 게시글이 없어요 😓</div>
        <FixedButton></FixedButton>
      </>
    );
  }

  // Link 컴포넌트에 스타일을 적용하기 위해 styled-components를 사용
  const CustomLink = styled(Link)`
    text-decoration: none;
    color: inherit;
  `;

  return (
    <>
      <Banner></Banner>
      <Search></Search>
      <St.SelectorWrap>
        {/* 위치 인증 여부 : 아무나 환영 | 우리 동네만 */}
        <Selector
          options={locationOptionsData?.map((item) => ({
            value: t(item),
            label: t(item),
          }))}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedVerify(selectedOption.target.value);
          }}
        ></Selector>
        {/* 시/도 */}
        <Selector
          options={sidoOptionsData?.map((option) => ({
            value: t(option.doName),
            label: t(option.doName),
          }))}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedSido(selectedOption.target.value);
          }}
        ></Selector>
        {/* 구/군 */}
        <Selector
          options={gugunOptionsData?.map((option) => ({
            value: t(option.guName),
            label: t(option.guName),
          }))}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedGugun(selectedOption.target.value);
          }}
        ></Selector>
        {/* 카테고리 : 맛집/커피, 운동/건강, 애완동물, 공부/교육 */}
        <Selector
          options={categoryOptionsData?.map((item) => ({
            value: t(item),
            label: t(item),
          }))}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedCategory(selectedOption.target.value);
          }}
        ></Selector>
      </St.SelectorWrap>
      {/* 카드 */}
      {postData.map((postDataItem, index) => (
        <CustomLink to={`/postview/${postDataItem.event.eventId}`}>
          <Card key={index} {...postDataItem}></Card>
        </CustomLink>
      ))}
      <FixedButton></FixedButton>
    </>
  );
};

export default MainPage;
