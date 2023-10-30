import React, { useState, useEffect } from "react";
import * as St from "./STMainPage";
import Banner from "../common/Banner/Banner";
// import Search from "../common/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Selector from "../common/Selector/Selector";
import Card from "../common/Card/Card";
import FixedButton from "../common/FixedButton/FixedButton";
import axios, { AxiosInstance } from "axios";
import { Spinner } from "../common/Spinner";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLanguage } from "../../util/Locales/useLanguage";
import i18n from "../../util/Locales/i18n";
import toast from "react-hot-toast";

const MainPage: React.FC = () => {

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
  const [sidoList, setSidoList] = useState<string[]>();
  const [gugunList, setGugunList] = useState<string[]>();
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
    searchApi: (keyword:string) => customAxios.get("/search", {
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
      setSidoList(data);
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
   * 샐랙터 기본값이면 모든 카드가 보이게
   * 필터링하려면 verify를 무조건 선택 해야 다음 필터링이 가능함 (현 api 구조상)
  */
  const postListSearch = async ()  => {
    setLoading(true); // 로딩중

    // 지역 범위 샐랙터가 선택되지 않은 상태로 다른 샐랙터들이 먼저 선택 되었을 때
    // 231030 JSY setter가 초기화되지 않는 이슈로 임시로 setTimeout으로 해결. 추후 수정 필요
    // if(verify == '' && (sido != t('시 / 도') || gugun != t('구 / 군') || category != '')) {
    //   toast.error(t('지역 범위를 먼저 선택해 주세요'));
    //   setTimeout(()=>{
    //     window.location.reload();
    //   }, 1000);
    //   return false;
    // }

    const response:CardProps[] = await (verify == '' ? mainAPI.cardListApi() : mainAPI.filterVerifyApi(t(verify)))
      .then((response) => {
        // console.log('게시글 데이터:', response.data);
        return response.data;
      }).catch((error) => {
        console.log("게시글 불러오기 에러!", error);
        throw error;
      });

      // 샐랙터 옵션이 설정되면 필터링
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
        setPostList(response);
      }
      setLoading(false);
  }

  // 게시글 검색
  /**
   * @method searchHandler
   * @return {string} data
  */
  const searchCards = async () => {
    // 빈칸 입력시 유효성 검사
    if (keyword.length == 0 || keyword == null || keyword == undefined || keyword == "") {
      toast.error(t("검색어를 입력해주세요!"), {
        className: "toast-error toast-container",
      });
      return;
    }

    // 최소 글자 유효성 검사
    if (keyword.length < 2) {
      toast.error(t("최소 2글자 이상 입력해 주세요!"), {
        className: "toast-error toast-container",
      });
      return;
    }

    setLoading(true); // 로딩중

    const response:CardProps[] = await (keyword == '' ? mainAPI.cardListApi() : mainAPI.searchApi(keyword))
    .then((response) => {
      console.log('검색된 게시글 데이터:', response.data);
      return response.data;
    }).catch((error) => {
      console.log("게시글 불러오기 에러!", error);
      throw error;
    });

    // 검색 버튼을 누르면 필터링
    if(keyword != ''){
      // const searchResponse:CardProps[] = response.filter(()=>{
      //   setPostList(searchResponse);
      //   console.log('여기는 타니?');
      // })
    } else {
      setPostList(response);
    }
    setLoading(false);
  }


  // 핸들러 목록
  useEffect(()=>{
    /**
     * @method sidoHandler
     * @return {string} data("시 / 도", "서울특별시", "경기도"...)
     * 시/도 샐랙터 선택시 구/군 샐랙터에 시/도에 맞는 구/군 목록을 불러옴
     * 구/군 샐랙터에는 '구/군' 자체가 없어서 프론트에서 추가함
    */
    const sidoHandler = async ()=>{
      const gugun:string[] = await mainAPI.gugunApi(t(sido),lang).then(res=> {return res.data.map(v=> {return t(v.guName)})}).catch(err=>{throw err});
      setGugunList([...new Set((new Array<string>(t('구 / 군')).concat(gugun)))]);
      //포스트 조회 로직
    }
    if(sido){ 
      sidoHandler(); 
    }

      postListSearch();
  },[verify, sido, gugun, category, lang]);


  /**
   * @description 메인페이지 렌더링
   * loading 상태는 Spinner 컴포넌트로 대체
   * @return {string} data(카드 형태 리스트)
   */
  return (
    <>
      <Banner></Banner>
      {/* <Search onSearch={onSearch}></Search> */}
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
      <St.SelectorWrap>
        {/*  게시글 지역 범위 */}
        <Selector
          options={verifyList?.map((item) => ({
            value: t(item),
            label: t(item),
          }))}
          value={t(verify)}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setVerify(selectedOption.target.value);
          }}
        ></Selector>
        {/* 시/도 */}
        <Selector
          options={sidoList?.map((sidoName:string) => {
            return {
              value: t(sidoName),
              label: t(sidoName),
            }
          })}
          value={t(sido)}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setSido(selectedOption.target.value);
          }}
        ></Selector>
        {/* 구/군 */}
        <Selector
          options={gugunList?.map((gugunName) => ({
            value: t(gugunName),
            label: t(gugunName),
          }))}
          value={t(gugun)}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setGugun(selectedOption.target.value);
          }}
        >
        </Selector>
        {/* 카테고리 */}
        <Selector
          options={categoryList?.map((item) => ({
            value: t(item),
            label: t(item),
          }))}
          value={t(category)}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setCategory(selectedOption.target.value);
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
      {loading == true ? <Spinner/> : <></>}
    </>
  )
};

export default MainPage;
