import React, { useState } from 'react'
import * as St from './STWritePost'
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import axios, {AxiosInstance} from 'axios';
import { Selector } from '../../common/Selector'
import { Button } from '../../common/Button';
import { useLanguage } from '../../../util/Locales/useLanguage';

const WritePost: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  // 게시글 작성 state
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>();
  const [signupStartDate, setSignupStartDate] = useState<string>();
  const [signupEndDate, setSignupEndDate] = useState<string>();
  const [eventLocation, setEventLocation] = useState<string>('');
  const [maxSize, setMaxSize] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('☕맛집/커피');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<string>('🙋‍♀️아무나');
  const [eventImg, setEventImg] = useState<null>(null);

  // 사용하지 않는 변수임을 명시적으로 알리기
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedVariables = { setCategory, setIsDeleted, setIsVerified, setEventImg };

  // AxiosInstance & API 설정
  const customAxios:AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
  const writePostAPI = {
    locationApi: () => customAxios.get("data/toss"), // 위치 인증 여부
    // sidoApi: () => customAxios.get("data/city"),    // 시도
    // gugunApi: (sido: string) =>
    //   customAxios.get("data/gu_name", {
        // 구군
    //     params: { doName: sido },
    //   }),
    categoryApi: () => customAxios.get("data/toss"), // 카테고리
    WritePostApi : () => customAxios.post('events'), // 게시글 작성
  }

  // 위치 인증 여부 interface (console.log 기준)
  interface CategoryOptionsProps {
    data: {
      category: string[];
      verify: string[];
    };
  }

  // 위치 인증 여부 - DB 연동
  const { data: locationOptionsData } = useQuery<CategoryOptionsProps[], Error>(
    "locationOptions",
    async () => {
      const response = await writePostAPI
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
    "sidoOptions",
    async () => {
      const response = await writePostAPI
        .sidoApi()
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log("시/도 불러오기 실패", error);
          throw error;
        });
      return response;
    }
  );

  // 구/군 옵션 interface (console.log 기준)
  // interface GugunOptionsProps {
  //   guName: string[];
  // }

  // 구/군 옵션 - DB 연동
  // const { data: gugunOptionsData, refetch: refetchGugunOptions } = useQuery<
  //   GugunOptionsProps[]
  // >(
  //   // queryKey를 배열로 감싸서 설정
  //   ["gugunOptions", selectedSido],
  //   async () => {
  //     const response = await writePostAPI
  //       .gugunApi(selectedSido)
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((error) => {
  //         console.log("구/군 불러오기 실패", error);
  //         throw error;
  //       });
  //     return response;
  //   },
  //   {
  //     enabled: !!selectedSido, // 선택된 시/도가 있을 때만 요청을 보내도록 설정
  //   }
  // );

  // refetch를 통해 시/도 옵션이 바뀌면 구/군 옵션이 바로 바뀌도록 설정
  // useEffect(() => {
  //   refetchGugunOptions();
  // }, [selectedSido]);

  // 카테고리 옵션 - DB 연동
  const { data: categoryOptionsData } = useQuery<CategoryOptionsProps[]>(
    "categoryOptions",
    async () => {
      const response = await writePostAPI
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

  // 게시글 작성 interface (console.log 기준)
  interface WritePostData {
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
    "eventImg": string | null
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
      // 필수 입력값 체크
      if (!eventName || !eventDate || !signupStartDate || !signupEndDate || !content) {
        alert('내용을 모두 입력해주세요!');
        return;
      }

      // 모임일시가 참가신청 기간보다 빠른 경우 체크
      if (new Date(eventDate) < new Date(signupStartDate)) {
        alert("모임일시는 참가신청 기간보다 빠를 수 없습니다!");
        return;
      }

      // 참가신청 기간 두번째 input이 첫번째 input보다 빠른 경우 체크
      if (new Date(signupStartDate) > new Date(signupEndDate)) {
        alert("참가신청 기간은 종료일이 시작일보다 빠를 수 없습니다!");
        return;
      }

      // 참가신청 기간 두번째 input이 모임일시보다 빠른 경우 체크
      if (new Date(eventDate) < new Date(signupEndDate)) {
        alert("참가신청 기간은 모임일시보다 빠를 수 없습니다!");
        return;
      }

      // 모임일시보다 참가신청 기간이 늦는 경우 체크
      if (new Date(eventDate) < new Date(signupEndDate)) {
        alert("참가신청 기간은 모임일시보다 늦을 수 없습니다!");
        return;
      }

      // 모임인원 체크
      if (maxSize < 0 || maxSize == 0) {
        alert("모임인원은 1명 이상이어야 합니다!");
        return;
      }

      // 본문 내용 길이 체크
      const contentLength = 200;
      if (content.length > contentLength) {
        alert(`본문 내용은 ${contentLength}자 이내로 입력해주세요!`);
        return;
      }

      const postData: WritePostData = {
        eventName,
        maxSize,
        eventDate: new Date(eventDate),
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

  return (
    <St.PostSection>
      <St.SelectorWrap>

          {/* 카테고리 */}
          <Selector
            options={categoryOptionsData?.map((item) => ({
              value: t(item),
              label: t(item),
            }))}
            onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
              setCategory(selectedOption.target.value);
            }}
          ></Selector>

          {/* 위치인증 */}
        <Selector
            options={locationOptionsData?.map((item) => ({
              value: t(item),
              label: t(item),
            }))}
            onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
              setIsVerified(selectedOption.target.value);
            }}
          ></Selector>

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
          {/* <Selector
            options={sidoOptionsData?.map((item) => ({
              value: t(item.doName),
              label: t(item.doName),
            }))}
            onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
              setEventLocation(selectedOption.target.value);
              console.log(selectedOption.target.value)
            }}
          ></Selector> */}
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