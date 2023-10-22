import React, { useState } from 'react'
import * as St from './STWritePost'
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios, {AxiosInstance} from 'axios';
import { Selector } from '../../common/Selector'
import { Button } from '../../common/Button';
import { useRecoilValue } from 'recoil';
import { sidoOptionsState, categoryOptionsState } from '../../../recoil/atoms/SelectState';

const WritePost: React.FC = () => {
  const sidoOptions = useRecoilValue(sidoOptionsState);
  const categoryOptions = useRecoilValue(categoryOptionsState);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  // AxiosInstance & API 설정
  const customAxios:AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
  const writePostAPI = {
    WritePostApi : () => customAxios.post('events'),            // 게시글 작성
  }

  // 게시글 작성 interface (console.log 기준)
  interface WritePostData {
    // data : {
    "eventName": string,
    "maxSize": number,
    "eventDate": string,
    "signupStartDate": string,
    "signupEndDate": string,
    "eventLocation": string,
    "content": string,
    "category": string,
    "isDeleted": boolean,
    "isVerified": string,
    "eventImg": string | null,
    // }
  }

  // 게시글 작성 - DB 연동
  const writePostMutation = useMutation(
    async (postData: WritePostData) => {
      try {
        const response = await customAxios.post('events', postData);
        return response.data;
      } catch (error) {
        console.error('게시글 작성 실패', error);
        throw error;
      }
    }
  );

  // 게시글 취소
  const postCancel = () => {
    navigate('/');
  }

  // 게시글 등록
  const postAdd = async () => {
    try {
      if (!eventName || !eventDate || !signupStartDate || !signupEndDate || !eventLocation || !maxSize || !content) {
        alert('내용을 모두 입력해주세요!');
        return;
      }

      const postData: WritePostData = {
        eventName,
        maxSize,
        eventDate: new Date(eventDate), // 문자열을 Date 객체로 변환
        signupStartDate: new Date(signupStartDate),
        signupEndDate: new Date(signupEndDate),
        eventLocation,
        content,
        category,
        isDeleted,
        isVerified,
        eventImg,
      };
      await writePostMutation.mutateAsync(postData);
      navigate('/');
    } catch (error) {
      console.log('게시글 작성 실패', error);
    }
  }

  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>();
  const [signupStartDate, setSignupStartDate] = useState<string>();
  const [signupEndDate, setSignupEndDate] = useState<string>();
  const [eventLocation, setEventLocation] = useState<string>('');
  const [maxSize, setMaxSize] = useState<number>(0);
  const [content, setContent] = useState<string>('');

  // 임시로 만들어둠
  const [category, setCategory] = useState<string>('test');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<string>('test');
  const [eventImg, setEventImg] = useState<null>(null);

  // 사용하지 않는 변수임을 명시적으로 알리기
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedVariables = { setCategory, setIsDeleted, setIsVerified, setEventImg };

  return (
    <St.PostSection>
      <St.SelectorWrap>
        <Selector options={sidoOptions}></Selector>
        <Selector options={categoryOptions}></Selector>
      </St.SelectorWrap>
      <St.TitleWrap>
        <input type="text" placeholder='제목을 입력하세요' value={eventName} onChange={(e)=>{setEventName(e.target.value)}}/>
      </St.TitleWrap>
      <St.InputWrap>
        <div>
          <p>모임일시</p>
          <input type="date" value={eventDate} onChange={(e)=>{setEventDate(e.target.value)}}/>
        </div>
        <div>
          <p>참가신청 기간</p>
          <input type="date" value={signupStartDate} onChange={(e)=>{setSignupStartDate(e.target.value)}}/>
          &nbsp;~&nbsp;
          <input type="date" value={signupEndDate} onChange={(e)=>{setSignupEndDate(e.target.value)}}/>
        </div>
        <div>
          <p>모임주소</p>
          <input type="text" placeholder='ex. 서울시 마포구' value={eventLocation} onChange={(e)=>{setEventLocation(e.target.value)}}/>
        </div>
        <div>
          <p>모임인원</p>
          <input type="number" placeholder='ex. 10' value={maxSize} onChange={(e)=>{setMaxSize(parseInt(e.target.value))}}/>
          <span>명</span>
        </div>
      </St.InputWrap>
      <St.ContentsWrap>
        <textarea placeholder='내용을 입력하세요' value={content} onChange={(e)=>{setContent(e.target.value)}}/>
      </St.ContentsWrap>
      <St.ButtonWrap>
        <Button bgcolor="#fff" onClick={postCancel}>취소</Button>
        <Button onClick={postAdd}>등록</Button>
      </St.ButtonWrap>
    </St.PostSection>
  )
}

export default WritePost