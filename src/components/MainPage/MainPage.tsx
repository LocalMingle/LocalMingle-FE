// Main.tsx
import React from 'react';
import * as St from './STMainPage';
import Banner from '../common/Banner/Banner';
import Search from '../common/Search/Search';
import Selector from '../common/Selector/Selector';
import Card from '../common/Card/Card';
import FixedButton from '../common/FixedButton/FixedButton';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Spinner } from '../common/Spinner';

const MainPage: React.FC = () => {
  const nothingOptions = [
    { value: 'nothingOptions1', label: '🤩 로컬밍글' },
    { value: 'nothingOptions2', label: '😍 LocalMingle' },
  ];

  const accessToken = localStorage.getItem('accessToken');

  // 위치 인증 여부 interface (console.log 기준)
  interface LocationOptionsProps {

  }

  // 위치 인증 여부 - DB 연동
  const { data: locationOptionsData } = useQuery<LocationOptionsProps, unknown>(
    'locationOptions',
    async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}categories`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('위치 인증 여부 성공', response.data);
          return response.data;
        }
      } catch (error) {
        console.log('위치 인증 여부 불러오기 실패', error);
        throw error;
      }
    }
  );

  // 시/도 옵션 interface (console.log 기준)
  interface SidoOptionsProps {
    doName: string;
  }

  // 시/도 옵션 - DB 연동
  const { data: sidoOptionsData } = useQuery<SidoOptionsProps, unknown>(
    'sidoOptions',
    async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}data/city`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('시/도 옵션 성공', response.data);
          return response.data;
        }
      } catch (error) {
        console.log('시/도 불러오기 실패', error);
        throw error;
      }
    }
  );

  // 구/군 옵션 interface (console.log 기준)
  interface GugunOptionsProps {
    guName: string;
  }

  // 구/군 옵션 - DB 연동
  const { data: gugunOptionsData } = useQuery<GugunOptionsProps, unknown>(
    'gugunOptions',
    async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}data/gu_name`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('구/군 옵션 성공', response.data);
          return response.data;
        }
      } catch (error) {
        console.log('구/군 불러오기 실패', error);
        throw error;
      }
    }
  );

  // 카테고리 옵션 interface (console.log 기준)
  interface CategoryOptionsProps {
    category: string;
  }

  // 카테고리 옵션 - DB 연동
  const { data: categoryOptionsData } = useQuery<CategoryOptionsProps, unknown>(
    'categoryOptions',
    async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}categories`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('카테고리 옵션 성공', response.data);
          return response.data;
        }
      } catch (error) {
        console.log('카테고리 옵션 카테고리 불러오기 실패', error);
        throw error;
      }
    }
  );

  // 게시글 전체 조회 interface (console.log 기준)
  interface CardProps {
    data : {
      event : {
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
      },
      guestList: number;
      gustUser : {
        guestEventId: number;
        GuestId: null;
        EventId: number
      },
      hostUser: {
        userDetailId: number;
        UserId: number;
        nickname: string;
        intro: null;
        profileImg: null;
        updatedAt: string;
      };
    }
  }
  
  // 게시글 전체 조회 - DB 연동
  const { isLoading: postsLoading, data: postData } = useQuery<CardProps, unknown>(
    'get',
    async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}events`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log('게시글 전체조회 리스트:', response.data);
          return response.data;
        }
      } catch (error) {
        console.log('게시글 전체조회 에러!', error);
        throw error;
      }
    }
  );

  // 로딩 중인 경우
  if (postsLoading) return <Spinner />;

  // 데이터가 없는 경우
  if (!postData) {
    return (
      <>
        <Banner></Banner>
        <Search></Search>
        <St.SelectorWrap>
          {/* 위치 인증 여부 : 아무나 환영 | 우리 동네만 */}
          <Selector options={nothingOptions}></Selector>
          {/* 시/도 */}
          <Selector options={nothingOptions}></Selector>
          {/* 구 */}
          <Selector options={nothingOptions}></Selector>
          {/* 카테고리 : 맛집/커피, 운동/건강, 애완동물, 공부/교육 */}
          <Selector options={nothingOptions}></Selector>
        </St.SelectorWrap>
        <div>게시글이 없습니다!</div>
        <FixedButton></FixedButton>
      </>
    );
  }

  return (
    <>
      <Banner></Banner>
      <Search></Search>
      <St.SelectorWrap>
        {/* 위치 인증 여부 : 아무나 환영 | 우리 동네만 */}
        <Selector options={nothingOptions}></Selector>
        {/* <Selector options={locationOptionsData?.map(item => ({value: item.location, label: item.location}))}></Selector> */}
        {/* 시/도 */}
        <Selector options={sidoOptionsData?.map(item => ({ value: item.doName, label: item.doName }))}></Selector>
        {/* 구/군 */}
        <Selector options={gugunOptionsData?.map(item => ({ value: item.guName, label: item.guName}))}></Selector>
        {/* 카테고리 : 맛집/커피, 운동/건강, 애완동물, 공부/교육 */}
        <Selector options={nothingOptions}></Selector>
        {/* <Selector options={categoryOptionsData?.map(item => ({value: item.category, label: item.category}))}></Selector> */}
      </St.SelectorWrap>
      {/* 카드 */}
      {postData.map((postDataItem) => (
        <Card key={postDataItem.event.eventId} data={postDataItem}></Card>
      ))}
      <FixedButton></FixedButton>
    </>
  );
};

export default MainPage;
