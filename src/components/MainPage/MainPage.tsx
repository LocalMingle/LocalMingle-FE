import React, { useState, useEffect } from 'react';
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
  const accessToken = localStorage.getItem('accessToken');
  const [selectedVerify, setSelectedVerify] = useState<string>(""); // 위치 인증 여부
  const [selectedSido, setSelectedSido] = useState<string>("서울특별시"); // 시도
  const [selectedGugun, setSelectedGugun] = useState<string>(""); // 구군
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // 카테고리

  // 위치 인증 여부 interface (console.log 기준)
  interface CategoryOptionsProps {
    data : {
      category: string[];
      verify: string[];
    }
  }

  // 위치 인증 여부 - DB 연동
  const { data: locationOptionsData } = useQuery<CategoryOptionsProps[]>(
    'locationOptions',
    async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}data/toss`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data)
          return response.data.verify;
        }
      } catch (error) {
        console.log('위치 인증 여부 불러오기 실패', error);
        throw error;
      }
    }
  );

  // 시/도 옵션 interface (console.log 기준)
  interface SidoOptionsProps {
    doName: string[];
  }

  // 시/도 옵션 - DB 연동
  const { data: sidoOptionsData } = useQuery<SidoOptionsProps[]>(
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
    guName: string[];
  }

  // 구/군 옵션 - DB 연동
  const { data: gugunOptionsData, refetch: refetchGugunOptions } = useQuery<GugunOptionsProps[]>(
    'gugunOptions',
    async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}data/gu_name`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
            params: { 'doName': selectedSido },
          }
        );
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.log('구/군 불러오기 실패', error);
        throw error;
      }
    },
    {
      enabled: !!selectedSido, // 선택된 시/도가 있을 때만 요청을 보내도록 설정
    }
  );

  // refetch를 통해 시/도 옵션이 바뀌면 구/군 옵션이 바로 바뀌도록 설정
  useEffect(() => {
    refetchGugunOptions();
  }, [selectedSido]);

  // 카테고리 옵션 - DB 연동
  const { data: categoryOptionsData } = useQuery<CategoryOptionsProps[]>(
    'categoryOptions',
    async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}data/toss`,
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          return response.data.category;
        }
      } catch (error) {
        console.log('카테고리 옵션 카테고리 불러오기 실패', error);
        throw error;
      }
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
    hostUser: [{
      userDetailId: number;
      UserId: number;
      nickname: string;
      intro: string;
      profileImg: string;
      updatedAt: string;
    }];
  }

  // 게시글 전체 조회 - DB 연동
  const { isLoading: postsLoading, data: postData } = useQuery<CardProps[]>(
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
          // console.log('게시글 전체조회 리스트:', response.data);
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
  if (!postData || postData.length === 0) {
    return (
      <>
        <Banner></Banner>
        <Search></Search>
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
        <Selector 
          options={locationOptionsData?.map(item => ({value: item, label: item}))}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedVerify(selectedOption.target.value);
        }}
        >
        </Selector>
        {/* 시/도 */}
        <Selector
          options={sidoOptionsData?.map(item => ({ value: item.doName, label: item.doName }))}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedSido(selectedOption.target.value);
          }}
        ></Selector>
        {/* 구/군 */}
        <Selector options={gugunOptionsData?.map(item => ({ value: item.guName, label: item.guName}))}
        onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedGugun(selectedOption.target.value);
        }}
        ></Selector>
        {/* 카테고리 : 맛집/커피, 운동/건강, 애완동물, 공부/교육 */}
        <Selector 
        options={categoryOptionsData?.map(item => ({value: item, label: item}))}
        onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedCategory(selectedOption.target.value);
        }}

        ></Selector>
      </St.SelectorWrap>
      {/* 카드 */}
      {postData.map((postDataItem, index) => (
          <Card key={index} {...postDataItem}></Card>
      ))}
      <FixedButton></FixedButton>
    </>
  );
};

export default MainPage;
