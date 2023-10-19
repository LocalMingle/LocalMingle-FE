import React from 'react'
import * as St from './STWritePost'
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, {AxiosInstance} from 'axios';
import { Selector } from '../../common/Selector'
import { Button } from '../../common/Button';

const STWritePost: React.FC = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  // AxiosInstance & API 설정
  const customAxios:AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL,
    headers: {
      Authorization : `${accessToken}`,
    }
  });
  const mainAPI = {
    WritePostApi : () => customAxios.post('events'),            // 게시글 작성
    // categoryApi :  () => customAxios.get('data/toss'),       // 카테고리
    // locationApi :  () => customAxios.get('data/toss'),       // 위치 인증 여부
  }

  // 게시글 작성 - DB 연동
  // const { data: WritePostData } = useQuery<string>(
  //   'WritePostData',
  //   async () => {
  //     const response = await mainAPI.WritePostApi()
  //     .then(response => {
  //       return response.data;
  //     }).catch(error=>{
  //         console.log('게시글 작성 실패', error);
  //         throw error;
  //     })
  //     return response;
  //   }
  // );

  // 게시글 취소
  const postCancel = () => {
    navigate('/');
  }

  // 게시글 등록
  const postAdd = () => {
    alert('게시글 등록 완료!');
  }

  return (
    <>
      <St.PostSection>
        <St.SelectorWrap>
          <Selector></Selector>
          <Selector></Selector>
        </St.SelectorWrap>
        <St.TitleWrap>
          <input type="text" placeholder='제목을 입력하세요'/>
        </St.TitleWrap>
        <St.InputWrap>
          <div>
            <p>모임일시</p>
            <input type="date"/>
          </div>
          <div>
            <p>참가신청 기간</p>
            <input type="date"/>&nbsp;~&nbsp;
            <input type="date"/>
          </div>
          <div>
            <p>모임주소</p>
            <input type="text" placeholder='ex. 서울시 마포구'/>
          </div>
          <div>
            <p>모임인원</p>
            <input type="number" placeholder='ex. 10'/>
            <span>명</span>
          </div>
        </St.InputWrap>
        <St.ContentsWrap>
          <textarea placeholder='내용을 입력하세요'/>
        </St.ContentsWrap>
        <St.ButtonWrap>
          <Button onClick={postCancel}>취소</Button>
          <Button onClick={postAdd}>등록</Button>
        </St.ButtonWrap>
      </St.PostSection>
    </>
  )
}

export default STWritePost