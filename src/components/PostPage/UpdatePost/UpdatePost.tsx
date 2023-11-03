import React, { useState, useEffect } from "react";
import * as St from "./STUpdatePost";
import { useNavigate } from "react-router-dom";
import { Selector } from "../../common/Selector";
import { Button } from "../../common/Button";
import axios, { AxiosInstance } from "axios";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import i18n from "../../../util/Locales/i18n";
import toast from "react-hot-toast";

const ModifyPost: React.FC = () => {
  const { t } = useLanguage();
  const lang = i18n.language;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const { eventId } = useParams<{ eventId?: string }>();

  // 게시글 작성 state
  const [eventName, setEventName] = useState<string>("");
  const [maxSize, setMaxSize] = useState<number>(0);
  const [eventDate, setEventDate] = useState<string>("");
  const [signupStartDate, setSignupStartDate] = useState<string>("");
  const [signupEndDate, setSignupEndDate] = useState<string>("");
  const [location_City, setLocation_City] = useState<string>("");
  const [location_District, setLocation_District] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<string>("");
  const [eventImg, setEventImg] = useState<null>(null);

  useEffect(() => {
    setLocation_City(t("시 / 도"));
    setLocation_District(t("구 / 군"));
  }, [t]);

  // AxiosInstance & API 설정
  const customAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const updatePostAPI = {
    locationApi: () => customAxios.get("data/toss"), // 위치 인증 여부
    sidoApi: (lang: string) =>
      customAxios.get("data/city", {
        params: { lang },
      }),
    gugunApi: (sido: string, lang: string) =>
      customAxios.get("data/gu_name", {
        params: { doName: sido, lang },
      }),
    categoryApi: () => customAxios.get("data/toss"), // 카테고리
    updatePostApi: () => customAxios.patch(`events/${eventId}`), // 게시글 수정
  };

  // 위치 인증 여부 interface (console.log 기준)
  interface CategoryOptionsProps {
    data: {
      category: string[];
      verify: string[];
    };
  }

  // 위치 인증 여부 - DB 연동
  const { data: locationOptionsData } = useQuery<CategoryOptionsProps, Error>(
    "locationOptions",
    async () => {
      const response = await updatePostAPI
        .locationApi()
        .then((response) => {
          return response;
        })
        .catch((error) => {
          // console.log("위치 인증 여부 불러오기 실패", error);
          throw error;
        });
      return response;
    }
  );
  
  // 카테고리 옵션 - DB 연동
  const { data: categoryOptionsData } = useQuery<CategoryOptionsProps, Error>(
    "categoryOptions",
    async () => {
      const response = await updatePostAPI
        .categoryApi()
        .then((response) => {
          return response;
        })
        .catch((error) => {
          // console.log("카테고리 옵션 카테고리 불러오기 실패", error);
          throw error;
        });
      return response;
    }
  );

  // 시/도 옵션 interface (console.log 기준)
  interface SidoOptionsProps {
    doName: string;
  }

  // 시/도 옵션 - DB 연동
  const { data: sidoOptionsData } = useQuery<SidoOptionsProps[]>(
    ["sidoOptions", lang],
    async () => {
      const response = await updatePostAPI
        .sidoApi(lang)
        .then((response) => {
          return response.data.items;
        })
        .catch((error) => {
          // console.log("시/도 불러오기 실패", error);
          throw error;
        });
      return response;
    }
  );

  // 구/군 옵션 interface (console.log 기준)
  interface GugunOptionsProps {
    guName: string;
  }

  // 구/군 옵션 - DB 연동
  const { data: gugunOptionsData, refetch: refetchGugunOptions } = useQuery<
    GugunOptionsProps[]
  >(
    // queryKey를 배열로 감싸서 설정
    ["gugunOptions", location_City],
    async () => {
      const response = await updatePostAPI
        .gugunApi(location_City, lang)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          // console.log("구/군 불러오기 실패", error);
          throw error;
        });
      return response;
    },
    {
      enabled: !!location_City, // 선택된 시/도가 있을 때만 요청을 보내도록 설정
    }
  );

  // refetch를 통해 시/도 옵션이 바뀌면 구/군 옵션이 바로 바뀌도록 설정
  useEffect(() => {
    refetchGugunOptions();

    // 시/도 옵션 초기화시 구/군 옵션도 초기화... 인데 추가 작업 중
    if (location_City == t("시 / 도") || location_City == "") {
      setLocation_District("");
    }

  }, [location_City, location_District, refetchGugunOptions]);


  // 게시글 정보 가져오기 interface (console.log 기준)
  interface GetPostData {
    event: {
      category: string;
      content: string;
      createdAt: string;
      eventDate: string;
      eventId: number;
      eventImg: string | null;
      eventName: string;
      isDeleted: boolean;
      isVerified: string;
      location_City: string;
      location_District: string;
      maxSize: number;
      signupEndDate: string;
      signupStartDate: string;
      updatedAt: string | Date;
    };
  }

  // 기존에 있던 게시물 정보 가져오기
  const { data: postData } = useQuery<GetPostData, Error>(
    "postData",
    async () => {
      const response = await customAxios
        .get(`events/${eventId}`)
        .then((response) => {
          // console.log('게시글 가져오기', response.data);
          return response.data;
        })
        .catch((error) => {
          // console.log("게시글 정보 불러오기 실패", error);
          throw error;
        });
      return response;
    }
  );

  useEffect(() => {
    if (postData) {
      setEventName(postData.event.eventName);
      setEventDate(postData.event.eventDate);
      setSignupStartDate(postData.event.signupStartDate);
      setSignupEndDate(postData.event.signupEndDate);
      setLocation_City(postData.event.location_City);
      setLocation_District(postData.event.location_District);
      setMaxSize(postData.event.maxSize);
      setContent(postData.event.content);
      setCategory(postData.event.category);
      setIsDeleted(postData.event.isDeleted);
      setIsVerified(postData.event.isVerified);
      setEventImg(null);
    }
  }, [postData]);

  // 게시글 수정 interface (console.log 기준)
  interface UpdatePostData {
    eventName: string;
    maxSize: number;
    eventDate: string | Date;
    signupStartDate: string | Date;
    signupEndDate: string | Date;
    location_City: string;
    location_District: string;
    content: string;
    category: string;
    isDeleted: boolean;
    isVerified: string;
    eventImg: string | null;
  }

  // 게시글 수정 - DB 연동
  const updatePostMutation = useMutation(async (postData: UpdatePostData) => {
    try {
      const response = await customAxios.patch(`events/${eventId}`, postData);
      // console.log('게시글 값?', response.data);
      return response.data;
    } catch (error) {
      toast.error(t("게시글 수정 실패!"), {
        className: "toast-error toast-container",
      });
      throw error;
    }
  });

  // 게시글 수정 취소
  const postCancel = async () => {
    navigate("/mypage/makelist");
  };

  // 게시글 수정
  const postModify = async () => {
    try {
      // 필수 입력값 체크
      if (
        !eventName ||
        !eventDate ||
        !signupStartDate ||
        !signupEndDate ||
        !location_City ||
        !location_District ||
        !content
      ) {
        toast.error(t("날짜 및 내용을 모두 입력해주세요."), {
          className: "toast-error toast-container",
        });
        return;
      }

      // 모임일시가 오늘 날짜보다 과거인 경우 체크
      const today = new Date();
      const yesterday = new Date(today.setDate(today.getDate() - 1));
      if (new Date(eventDate) < yesterday) {
        toast.error(t("모임일시는 오늘 날짜보다 과거일 수 없습니다!"), {
          className: "toast-error toast-container",
        });
        return;
      }

      // 모임일시가 참가신청 기간보다 빠른 경우 체크
      if (new Date(eventDate) < new Date(signupStartDate)) {
        toast.error(t("모임일시는 참가신청 기간보다 빠를 수 없습니다!"), {
          className: "toast-error toast-container",
        });
        return;
      }

      // 참가신청 기간 두번째 input이 첫번째 input보다 빠른 경우 체크
      if (new Date(signupStartDate) > new Date(signupEndDate)) {
        toast.error(t("참가신청 기간은 종료일이 시작일보다 빠를 수 없습니다!"), {
          className: "toast-error toast-container",
        });
        return;
      }

      // 참가신청 기간 두번째 input이 모임일시보다 빠른 경우 체크
      if (new Date(eventDate) < new Date(signupEndDate)) {
        toast.error(t("참가신청 기간은 모임일시보다 빠를 수 없습니다!"), {
          className: "toast-error toast-container",
        });
        return;
      }

      // 모임일시보다 참가신청 기간이 늦는 경우 체크
      if (new Date(eventDate) < new Date(signupEndDate)) {
        toast.error(t("참가신청 기간은 모임일시보다 늦을 수 없습니다!"), {
          className: "toast-error toast-container",
        });
        return;
      }

      // 최소 모임인원 체크
      if (maxSize < 0 || maxSize == 0) {
        toast.error(t("모임인원은 1명 이상이어야 합니다!"), {
          className: "toast-error toast-container",
        });
        return;
      }

      // 최대 모임인원 체크
      if (maxSize > 50) {
        toast.error(t("최대 모임인원은 50명까지 입니다!"), {
          className: "toast-error toast-container",
        });
        return;
      }

      // 본문 내용 길이 체크
      const contentLength = 200;
      if (content.length > contentLength) {
        toast.error(t(`본문 내용은 ${contentLength}자 이내로 입력해주세요!`), {
          className: "toast-error toast-container",
        });
        return;
      }

      // 샐랙터 체크
      if (category == t("선택") || category == "") {
        toast.error(t('카테고리 선택해 주세요!'), {
          className: "toast-error toast-container",
        });
        return;
      }

      if (isVerified == t("선택") || isVerified == "") {
        toast.error(t('모임 범위 선택해 주세요!'), {
          className: "toast-error toast-container",
        });
        return;
      }

      if (location_City == t("시 / 도") || location_City == "") {
        toast.error(t('시/도 선택해 주세요!'), {
          className: "toast-error toast-container",
        });
        return;
      }

      if (location_District == t("구 / 군") || location_District == "") {
        toast.error(t('구/군 선택해 주세요!'), {
          className: "toast-error toast-container",
        });
        return;
      }

      const updateData: UpdatePostData = {
        eventName,
        maxSize,
        eventDate: new Date(eventDate),
        signupStartDate: new Date(signupStartDate),
        signupEndDate: new Date(signupEndDate),
        location_City,
        location_District,
        content,
        category,
        isDeleted,
        isVerified,
        eventImg,
      };
      await updatePostMutation.mutateAsync(updateData);
      toast.success(t("수정이 완료되었습니다."), {
        className: "toast-success toast-container",
      });
      navigate("/mypage/makelist");
    } catch (error) {
      toast.error(t("게시글 수정 실패!"), {
        className: "toast-error toast-container",
      });
      throw error;
    }
  };

  const setDateFormat = (date: string): string => {
    // 날짜 형식 변경 2023-10-25
    return new String(date).split("T")[0];
  };

  return (
    <St.PostSection>
      <St.SelectorWrap>
        {/* 카테고리 */}
        <Selector
          options={categoryOptionsData?.data.category?.map((item:string) => ({
            value: t(item||''),
            label: t(item||''),
          }))||[]}
          value={category}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setCategory(selectedOption.target.value);
          }}
        ></Selector>

        {/* 위치인증 */}
        <Selector
          options={locationOptionsData?.data.verify?.map((item:string) => ({
            value: t(item||''),
            label: t(item||''),
          }))||[]}
          value={isVerified}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setIsVerified(selectedOption.target.value);
          }}
        ></Selector>
      </St.SelectorWrap>
      <St.TitleWrap>
        <input
          type="text"
          placeholder={t("제목을 입력하세요")}
          value={eventName}
          onChange={(e) => {
            setEventName(e.target.value);
          }}
        />
      </St.TitleWrap>
      <St.InputWrap>
        <div>
          <p>{t("모임일시")}</p>
          <input
            type="date"
            value={setDateFormat(eventDate)}
            onChange={(e) => {
              setEventDate(e.target.value);
            }}
          />
        </div>
        <div>
          <p>{t("참가신청 기간")}</p>
          <input
            type="date"
            value={setDateFormat(signupStartDate)}
            onChange={(e) => {
              setSignupStartDate(e.target.value);
            }}
          />
          &nbsp;~&nbsp;
          <input
            type="date"
            value={setDateFormat(signupEndDate)}
            onChange={(e) => {
              setSignupEndDate(e.target.value);
            }}
          />
        </div>
        <div>
          <p>{t("모임주소")}</p>
          <St.DatePickerWrap>
            <Selector
              options={(sidoOptionsData||[])?.map((item) => ({
                value: t(item.doName),
                label: t(item.doName),
              }))}
              value={location_City}
              onChange={(
                selectedOption: React.ChangeEvent<HTMLSelectElement>
              ) => {
                setLocation_City(selectedOption.target.value);
              }}
            ></Selector>
            <Selector
              options={(gugunOptionsData||[])?.map((option) => ({
                value: t(option.guName),
                label: t(option.guName),
              }))}
              value={location_District}
              onChange={(
                selectedOption: React.ChangeEvent<HTMLSelectElement>
              ) => {
                setLocation_District(selectedOption.target.value);
              }}
            ></Selector>
          </St.DatePickerWrap>
        </div>
        <div>
          <p>{t("모임인원")}</p>
          <input
            type="number"
            placeholder="ex. 10"
            value={maxSize}
            onChange={(e) => {
              setMaxSize(parseInt(e.target.value));
            }}
          />
          <span>{t("명")}</span>
        </div>
      </St.InputWrap>
      <St.ContentsWrap>
        <textarea
          placeholder={t("내용을 입력하세요")}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </St.ContentsWrap>
      <St.ButtonWrap>
        <Button bgcolor="#fff" onClick={postCancel}>
          {t("취소")}
        </Button>
        <Button onClick={postModify}>{t("수정")}</Button>
      </St.ButtonWrap>
    </St.PostSection>
  );
};

export default ModifyPost;
