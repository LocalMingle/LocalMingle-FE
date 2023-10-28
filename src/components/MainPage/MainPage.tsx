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
  /**
   * @description 시/도 & 구/군 선택 옵션
   * @interface [<LocationSelectList>]
   */
  interface LocationSelectList {
    sido: string[];
    gugun: string[];
  }

  /**
   * @description 게시글 카드
   * @interface [<CardProps>]
   */
  interface CardProps {
    event: {
      category: string;
      content: string;
      createdAt: string;
      eventDate: string;
      eventId: number;
      eventImg: null | string;
      eventName: string;
      isDeleted: boolean;
      isVerified: string;
      location_City: string; 
      location_District: string;
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
  
  // Link 컴포넌트에 스타일을 적용하기 위해 styled-components를 사용
  const CustomLink = styled(Link)`
    text-decoration: none;
    color: inherit;
  `;

  // 다국어 지원 관련
  const { t } = useLanguage();
  const lang = i18n.language;
  
  // 토큰 (accessToken)
  const accessToken = localStorage.getItem("accessToken");
  
  // 공통 AxiosInstance
  const customAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL,
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  /**
   * @description useState : 옵션 선택 값
   * 게시글 검색: keyword
   * 지역 범위: verify
   * 카테고리: category
   * 카테고리목록: categoryList
   * 시/도: sido
   * 구/군:  gugun
   */
  const [keyword, setKeyword] = useState<string>("");
  const [verify, setVerify] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [location, setLocation] = useState<LocationSelectList>({});
  const [sido, setSido] = useState<string>(t("시 / 도"));
  const [gugun, setGugun] = useState<string>(t("구 / 군"));
  const [verifyList , setVerifyList] = useState<string[]>(); 
  const [postList , setPostList] = useState<CardProps[]>();
  const [loading, setLoading] = useState<boolean>(false);
  
  /**
   * @description mainAPI: DB에서 받아온 데이터
   * @method cardListApi(게시글조회)
   * @method locationApi(지역범위)
   * @method categoryApi(카테고리)
   * 
   * @method sidoApi(시/도)
   * @param {string} lang
   * 
   * @method gugunApi(구/군)
   * @param {string} doname:sido
   * @param {string} lang
   * 
   * @method searchApi(게시글검색)
   * @param {string} query: keyword
  */
  const mainAPI = {
    cardListApi: () => customAxios.get("events"),
    verifyApi: () => customAxios.get("data/toss"),
    sidoApi: (lang: string) =>
      customAxios.get("data/city", {
        params: { lang },
      }),
    gugunApi: (sido: string, lang: string) =>
      customAxios.get("data/gu_name", {
        params: { doName: sido, lang },
      }),
    categoryApi: () => customAxios.get("data/toss"),
    filterVerifyApi: (verifyType : string) => customAxios.get("/search/byVerify", {
      params: { query: verifyType },
    }),
    searchApi: () => customAxios.get("/search", {
      params: {
        query : keyword
      }
    }),
  };

  // useEffect 샐랙터 초기값 세팅
  useEffect(()=>{
    /**
     * @discussion 지역범위 샐랙터
     * @method verifyApiInit
     * @return {string} data("", "아무나", "동네만")
     */
    const verifyApiInit = async() =>{
      const data:string[] = await mainAPI.verifyApi().then(res=> {return res.data.verify}).catch(err=> {throw err});
      setVerifyList(data);
    };
    /**
     * @discussion 시/도 샐랙터
     * @method sidoApiInit
     * @return {string} data("시 / 도", "서울특별시", "경기도"...)
     * 구/군 의 경우 '구/군' 자체가 없어서 프론트에서 추가함
     */
    const sidoApiInit = async() =>{
      const data:string[] = await mainAPI.sidoApi(lang).then(res=> {return res.data.items.map((v)=> {return t(v.doName)})}).catch(err=> {throw err});
      const newSido:LocationSelectList = {
        sido : data,
        gugun : new Array<string>(t('구 / 군'))
      }
      setLocation(newSido);
    };
    /**
     * @description 카테고리 샐랙터
     * @method categoryOptionsData
     * @return {string} data("맛집/커피", "운동/건강", "애완동물", "공부/교육")
     */
    const categoryOptionsData = async() =>{
      const data:string[] = await mainAPI.categoryApi().then(res=> {return res.data.category}).catch(err=> {throw err});
      setCategoryList(data);
    }

    verifyApiInit();
    sidoApiInit();
    categoryOptionsData();
    postListSearch();
  },[]);


  // 게시글 조회
  /**
   * @method postListSearch
   * @return {string} data(카드 형태 리스트)
  */
  const postListSearch = async ()  => {
    setLoading(true);
    const response:CardProps[] = await (verify == '' ? mainAPI.cardListApi() : mainAPI.filterVerifyApi(t(verify)))
      .then((response) => {
        console.log('게시글 데이터:', response.data);
        return response.data;
      }).catch((error) => {
        console.log("게시글 불러오기 에러!", error);
        throw error;
      });

      if(verify != ''){
        const newResponse:CardProps[] = response.filter((root:CardProps)=>{
          if(sido == t('시 / 도')) return true;
          else if (sido != t('시 / 도') && root.event.location_City == sido)
            return true;
          else return false;
        }).filter((root:CardProps)=>{
          if(gugun == t('구 / 군')) return true;
          else if (gugun != t('구 / 군') && root.event.location_District == gugun)
            return true;
          else return false;
        }).filter((root:CardProps)=>{
          if(category == t('')) return true;
          else if (category != t('') && root.event.category == category)
            return true;
          else return false;
        })

        setPostList(newResponse);
      } else {
        setPostList(response)
      }
      setLoading(false);
  }

  // 핸들러 목록
  /**
   * @method sidoHandler
   * @return {string} data("시 / 도", "서울특별시", "경기도"...)
  */
  const sidoHandler = async (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setSido(t(e.target.value));
    const gugun:string[] = await mainAPI.gugunApi(t(e.target.value),lang).then(res=> {return res.data.map(v=> {return t(v.guName)})}).catch(err=>{throw err});
    const newLoc:LocationSelectList = {
      sido: [...location.sido],
      gugun:  [...new Set((new Array<string>(t('구 / 군')).concat(gugun)))]
    }
    setLocation(newLoc);
    //포스트 조회 로직
    postListSearch();
  }
  /**
   * @method gugunHandler
   * @return {string} data("구 / 군", 경기도 > "용인시", "수원시"...)
   * 구/군 의 경우 '구/군' 자체가 없어서 프론트에서 추가함
   * new Set으로 중복제거 후 다시 배열로 선언('구/군'때문에)
  */
  const gugunHandler = async (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setGugun(t(e.target.value));
    //포스트 조회 로직
    postListSearch();
  }
  /**
   * @method verifyHandler
   * @return {string} data("아무나", "동네만")
  */
  const verifyHandler = async(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setVerify(t(e.target.value));
    //포스트 조회 로직
    postListSearch();
  }
  /**
   * @method categoryHandler
   * @return {string} data("맛집/커피", "운동/건강", "애완동물", "공부/교육")
  */
  const categoryHandler = async(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setCategory(t(e.target.value));
    //포스트 조회 로직
    postListSearch();
  }

  // // 데이터가 없는 경우
  // if (!postDataCp || postDataCp.length === 0) {
  //   return (
  //     <>
  //       <Banner></Banner>
  //       <Search></Search>
  //       <div>앗! 게시글이 없어요 😓</div>
  //       <FixedButton></FixedButton>
  //     </>
  //   );
  // }

  /**
   * @description 메인페이지 렌더링
   * loading 상태는 Spinner 컴포넌트로 대체
   * @return {string} data(카드 형태 리스트)
   */
  return loading == true ? <Spinner /> :
  (
    <>
      <Banner></Banner>
      <Search></Search>
      <St.SelectorWrap>
        {/*  게시글 지역 범위 */}
        <Selector
          options={verifyList?.map((item) => ({
            value: t(item),
            label: t(item),
          }))}
          value={verify}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            verifyHandler(selectedOption);
          }}
        ></Selector>
        {/* 시/도 */}
        <Selector
          options={location.sido?.map((sidoName:string) => ({
            value: sidoName,
            label: sidoName,
          }))}
          value={sido}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            sidoHandler(selectedOption);
          }}
        ></Selector>
        {/* 구/군 */}
        <Selector
          options={location.gugun?.map((gugunName) => ({
            value: gugunName,
            label: gugunName,
          }))}
          value={gugun}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            gugunHandler(selectedOption);
          }}
        >
        </Selector>
        {/* 카테고리 */}
        <Selector
          options={categoryList?.map((item) => ({
            value: t(item),
            label: t(item),
          }))}
          value={category}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            categoryHandler(selectedOption);
          }}
        ></Selector>
      </St.SelectorWrap>
      {/* 카드 */}
      {postList?.map((postDataItem, index) => (
        <CustomLink to={`/postview/${verify == '' ? postDataItem.event.eventId : postDataItem.event.eventId}`}>
          <Card key={index} {...postDataItem}></Card>
        </CustomLink>
      ))}
      <FixedButton></FixedButton>
    </>
  );
};

export default MainPage;
