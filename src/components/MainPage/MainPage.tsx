import React from 'react'
import * as St from './STMainPage'
import Banner from '../common/Banner/Banner'
import Search from '../common/Search/Search'
import Selector from '../common/Selector/Selector'
import Card from '../common/Card/Card'
import FixedButton from '../common/FixedButton/FixedButton'
import { QueryObserverResult, useQuery } from 'react-query'
import axios from 'axios'
import { Spinner } from '../common/Spinner'

const MainPage: React.FC = () => {
  // 위치 인증 여부 옵션 값 -> DB로 가져올 예정
  const locationOptions = [
    { value: 'anyone', label: '🙋🏻 아무나' },
    { value: 'neighborhood', label: '🏡 동네만' },
  ];
  
  // 시 임시 샐랙터 옵션 값 -> DB로 가져올 예정
  const doOptions = [
    { value: '경기도', label: '경기도' },
    { value: '서울특별시', label: '서울특별시' },
  ]

  // 구 임시 샐랙터 옵션 값 -> DB로 가져올 예정
  const guOptions = [
    { value: '성남시 분당구', label: '성남시 분당구' },
    { value: '관악구', label: '관악구' },
  ]

  // 카테고리 옵션 값 -> DB로 가져올 예정
  const categoryOptions = [
    { value: '맛집/커피', label: '☕️ 맛집/커피' },
    { value: '운동/건강', label: '🏃🏻 운동/건강' },
    { value: '애완동물', label: '🐾 애완동물' },
    { value: '공부/교육', label: '📚 공부/교육' },
  ]

  const accessToken = localStorage.getItem('accessToken')

  // 게시글 전체 조회 (Swagger 기준)
  interface CardProps {
    data : {
      category: string;
      content: string;
      createdAt: string;
      event: object;
      eventDate: string;
      eventId: number;
      eventLocation: string;
      eventName: string;
      isDeleted: boolean;
      isVerified: "no";
      maxSize: number;
      signupEndDate: string;
      signupStartDate: string;
      updatedAt: string;
    }
  }

  
  const { isLoading, data } = useQuery<CardProps, unknown>(
    "posts",
    async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}events`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
          )

        if (response.status == 200) {
          console.log('게시글 전체조회 리스트 :', response.data);
          // console.clear();
          // console.log(typeof data)
          return response.data;
        }
      } catch (error: unknown) {
        console.log('게시글 전체조회 에러! :', error);
        throw error;
      }
    }
  );




  // 로딩 중
  if (isLoading) return (<Spinner/>)


  // 카테고리
  // const { sidoData } = useQuery<CardProps, unknown>(
  //   "get",
  //   async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_REACT_APP_URL}data/city`,
  //         {
  //           headers: {
  //             Authorization: `${accessToken}`,
  //           },
  //         }
  //         )

  //       if (response.status == 200) {
  //         console.log('시/도 리스트 :', response.data);
  //         return response.data;
  //       }
  //     } catch (error: unknown) {
  //       console.log('시/도 전체조회 에러! :', error);
  //       throw error;
  //     }
  //   }
  // );

  // const { gunguData } = useQuery<QueryObserverResult<CardProps, unknown>>(
  //   "get",
  //   async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_REACT_APP_URL}data/gu_name`,
  //         {
  //           headers: {
  //             Authorization: `${accessToken}`,
  //           },
  //         }
  //         )

  //       if (response.status == 200) {
  //         console.log('군/구 리스트 :', response.data);
  //         return response.data;
  //       }
  //     } catch (error: unknown) {
  //       console.log('게시글 전체조회 에러! :', error);
  //       throw error;
  //     }
  //   }
  // );

  // 데이터가 없는 경우
  if (!data) return (
    <>
      <Banner></Banner>
      <Search></Search>
      <St.SelectorWrap>
        {/* 위치 인증 여부 : 아무나 환영 | 우리 동네만 */}
        <Selector options={locationOptions}></Selector>
        {/* 시/도 */}
        <Selector options={doOptions}></Selector>
        {/* 구 */}
        <Selector options={guOptions}></Selector>
        {/* 카테고리 : 맛집/커피, 운동/건강, 애완동물, 공부/교육 */}
        <Selector options={categoryOptions}></Selector>
      </St.SelectorWrap>
      {/* <Card></Card> */}
      <div>게시글이 없습니다!</div>
      <FixedButton></FixedButton>
    </>
  )

  return (
      <>
      <Banner></Banner>
      <Search></Search>
      <St.SelectorWrap>
        {/* 위치 인증 여부 : 아무나 환영 | 우리 동네만 */}
        <Selector options={locationOptions}></Selector>
        {/* 시/도 */}
        <Selector options={doOptions}></Selector>
        {/* 구 */}
        <Selector options={guOptions}></Selector>
        {/* 카테고리 : 맛집/커피, 운동/건강, 애완동물, 공부/교육 */}
        <Selector options={categoryOptions}></Selector>
      </St.SelectorWrap>
      {/* 카드 */}
      {data.map((postData: CardProps) => (
        <Card key={postData.eventName} data={postData.event}></Card>
      ))}
      <FixedButton></FixedButton>
    </>
  );
};

export default MainPage;
