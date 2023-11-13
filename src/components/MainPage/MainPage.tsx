import React, { useState, useEffect, useRef } from "react";
import * as St from "./STMainPage";
import Banner from "../common/Banner/Banner";
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
import { useInView } from "react-intersection-observer";

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
    guestList: number;
    hostUser: [
      {
        userDetailId: number;
        UserId: number;
        nickname: string;
        intro: string;
        profileImg: string;
        updatedAt: string;
        userLocation: string | null;
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
  const searchRef = useRef<HTMLInputElement>(null);
  const [verify, setVerify] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [sidoList, setSidoList] = useState<string[]>();
  const [gugunList, setGugunList] = useState<string[]>(["구 / 군"]);
  const [sido, setSido] = useState<string>(t(""));
  const [gugun, setGugun] = useState<string>(t(""));
  const [verifyList , setVerifyList] = useState<string[]>(); 
  const [postList , setPostList] = useState<CardProps[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0); // 현재 페이지 번호 (페이지네이션)
  const [ref, inView] = useInView(
    {
      threshold: 0.8, // 스크롤이 80% 이상 발생하면 inView가 true가 됨
    }
  );
  const initIsMounted = useRef(false);
  const initIsMounted2 = useRef(false);
  const [isReset,setIsReset] = useState<boolean>(true);

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
    searchApi: (verify: string, category: string, sido: string, gugun: string, keyword: string, page: number) => customAxios.get("/search", {
      params: {
        verify : verify == t('선택') ? '' : verify,
        category : category == t('선택') ? '' : category,
        city : sido == t('시 / 도') ? '' : sido,
        guName : gugun == t('구 / 군') ? '' : gugun,
        keyWord : keyword,
        page : page
      }
    }),
  };

  // useEffect 샐랙터 초기값 세팅
  useEffect(()=>{
    /**
     * @discussion 지역범위 샐랙터
     * @method verifyApiInit
     * @return {string} data("선택", "아무나", "동네만")
     */
    const verifyApiInit = async() =>{
      const data:string[] = await mainAPI.verifyApi().then(res=> {return res.data.verify}).catch(err=> {throw err});
      setVerifyList(data);
    };
    /**
     * @discussion 시/도 샐랙터
     * @method sidoApiInit
     * @return {string} data("시 / 도", "서울특별시", "경기도"...)
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
  */

  const postListSearch = async ()  => {
    setLoading(true); // 로딩중

    const response:CardProps[] = await mainAPI.searchApi(verify, category, sido, gugun, (searchRef?.current?.value||''), page)
      .then((response) => {
        return response.data;
      }).catch((error) => {
        throw error;
      });

    setPostList((prevPostList) =>{
      //기존 목록이 있는지? 있으면 연결.. 아니면 새로운 값
      //false 일때... 연결, true면 초기화
      if(isReset){
        return response;
      } else {
        return prevPostList ? [...prevPostList, ...response] : response
      }
    });

    setLoading(false); // 로딩완료
  }


  // 게시글 검색
  /**
   * @method searchHandler
   * @return {string} data
  */
  const searchCards = (v:string) => {
    if (!v) {
      toast.error(t("검색어를 입력해주세요!"), {
        className: "toast-error toast-container",
      });
      return;
    }

    // 최소 글자 유효성 검사
    if (v.length <= 1) {
      toast.error(t("최소 2글자 이상 입력해 주세요!"), {
        className: "toast-error toast-container",
      });
      return;
    }
      setKeyword(v);
  }

  /**
   * @description 검색창에서 엔터키를 누르면 검색
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchCards(e.currentTarget.value);
    }
  };
  const handleBlurPress = (e: React.FocusEvent<HTMLInputElement>) =>{
    e.target.value != '';
    searchCards(searchRef?.current?.value||'');
  }

  // 핸들러 목록
  useEffect(()=>{
    /**
     * @method sidoHandler
     * @return {string} data("시 / 도", "서울특별시", "경기도"...)
     * 시/도 샐랙터 선택시 구/군 샐랙터에 시/도에 맞는 구/군 목록을 불러옴
    */
    const sidoHandler = async ()=>{
      const gugun:string[] = await mainAPI.gugunApi(t(sido),lang).then(res=> {return res.data.map(v=> {return t(v.guName)})}).catch(err=>{throw err});
      setGugunList(gugun);
      //포스트 조회 로직
    }
    if(sido){ 
      sidoHandler(); 
    }
    
    if(initIsMounted.current){
      setIsReset(true);
      if(page == 0 ){
        postListSearch();
      } else {
        setPage(0);
      }
    } else {
      initIsMounted.current = true;
    }
  },[verify, sido, gugun, category , keyword]);

  useEffect(() => {
    
    if(initIsMounted2.current){
      postListSearch();
    } else {
      initIsMounted2.current = true;
    }
  }, [page]);
//처음...왔을땐 false , 게시글이 최초 있는 상태(page:0)에서 하단접근시 inView true... page가 4로 업데이트 됨
//page가 업뎃되었으니 postListSearch를 동작시켜서 page4가 넘어감....
//이땐 isReset이 false이기에 초기화 안됨..
//만약 셀렉터를 업뎃한경우 reset이 true...
//postListSearch에선 reset값이 true이기에 prevent+response가 아닌 response로 Set.
//이때 페이지는? page4가 그대로이기에.. 목록이 초기화되었어도 다음 호출은 4가 될것
//셀렉터가 업뎃되면 무조건 page는 0으로 초기화되야함

  
  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView && (postList?.length||0 > 0)) {
      setIsReset(false);
      setPage((page)=>page + 4);
    }
  }, [inView]);


  /**
   * @description 메인페이지 렌더링
   * loading 상태는 Spinner 컴포넌트로 대체
   * @return {string} data(카드 형태 리스트)
   */
  return (
    <>
      <Banner></Banner>
      <St.SearchBar>
        <div>
          <St.SearchInput
            ref={searchRef}
            // value={keyword}
            // onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleBlurPress}
            placeholder={t("제목 및 글 내용을 검색해 보세요.")}
          ></St.SearchInput>
          <p onClick={()=>searchCards(searchRef?.current?.value||'')}>
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
          }))||[]}
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
          })||[]}
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
          }))||[]}
          value={t(gugun)}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setGugun(selectedOption.target.value);
          }}
        ></Selector>
        {/* 카테고리 */}
        <Selector
          options={categoryList?.map((item) => ({
            value: t(item),
            label: t(item),
          }))||[]}
          value={t(category)}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setCategory(selectedOption.target.value);
          }}
        ></Selector>
      </St.SelectorWrap>
      {/* 카드 */}
      {postList?.map((postDataItem, index) => (
        <CustomLink to={`/postview/${postDataItem.event.eventId}`}>
          <Card key={index} {...postDataItem}></Card>
        </CustomLink>
      ))}
      <div ref={ref}/>
      <FixedButton></FixedButton>
      {loading == true ? <Spinner/> : <></>}
    </>
  )
};

export default MainPage;
