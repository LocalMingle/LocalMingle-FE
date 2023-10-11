import React from 'react'
import * as St from './STMainPage'
import Banner from '../common/Banner/Banner'
import Search from '../common/Search/Search'
import Selector from '../common/Selector/Selector'
import Card from '../common/Card/Card'
import FixedButton from '../common/FixedButton/FixedButton'

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

  return (
    <>
      <Banner></Banner>
      <Search></Search>
      <St.SelectorWrap>
        {/* 위치 인증 여부 : 아무나 환영 | 우리 동네만 */}
        <Selector options={locationOptions}></Selector>
        {/* 도 */}
        <Selector options={doOptions}></Selector>
        {/* 시 */}
        <Selector options={guOptions}></Selector>
        {/* 카테고리 : 맛집/커피, 운동/건강, 애완동물, 공부/교육 */}
        <Selector options={categoryOptions}></Selector>
      </St.SelectorWrap>
      {/* 카드 */}
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <FixedButton></FixedButton>
    </>
  );
};

export default MainPage;
