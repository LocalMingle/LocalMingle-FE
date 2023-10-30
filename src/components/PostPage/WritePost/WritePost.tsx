import React, { useState, useEffect } from "react";
import * as St from "./STWritePost";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios, { AxiosInstance } from "axios";
import { Selector } from "../../common/Selector";
import { Button } from "../../common/Button";
import { useLanguage } from "../../../util/Locales/useLanguage";
import i18n from "../../../util/Locales/i18n";
import toast from "react-hot-toast";

const WritePost: React.FC = () => {
  const { t } = useLanguage();
  const lang = i18n.language;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  // 게시글 작성 state
  const [eventName, setEventName] = useState<string>("");
  const [maxSize, setMaxSize] = useState<number>(0);
  const [eventDate, setEventDate] = useState<string | Date>();
  const [signupStartDate, setSignupStartDate] = useState<string | Date>();
  const [signupEndDate, setSignupEndDate] = useState<string | Date>("");
  const [location_City, setLocation_City] = useState<string>("시 / 도");
  const [location_District, setLocation_District] = useState<string>("구 / 군");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<string>("");
  const [eventImg, setEventImg] = useState<null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedVariable = [setIsDeleted, setEventImg] ;

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
  const writePostAPI = {
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
    WritePostApi: () => customAxios.post("events"), // 게시글 작성
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
      const response = await writePostAPI
        .locationApi()
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log("위치 인증 여부 불러오기 실패", error);
          throw error;
        });
      return response;
    }
  );

  
  // 카테고리 옵션 - DB 연동
  const { data: categoryOptionsData } = useQuery<CategoryOptionsProps, Error>(
    "categoryOptions",
    async () => {
      const response = await writePostAPI
        .categoryApi()
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log("카테고리 옵션 카테고리 불러오기 실패", error);
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
      const response = await writePostAPI
        .sidoApi(lang)
        .then((response) => {
          return response.data.items;
        })
        .catch((error) => {
          console.log("시/도 불러오기 실패", error);
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
  const { data: gugunOptionsData, refetch: refetchGugunOptions } = useQuery<GugunOptionsProps[]>(
    // queryKey를 배열로 감싸서 설정
    ["gugunOptions", location_City],
    async () => {
      const response = await writePostAPI
        .gugunApi(location_City, lang)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log("구/군 불러오기 실패", error);
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
  }, [location_City]);

  // 게시글 작성 interface (console.log 기준)
  interface WritePostData {
    eventName: string;
    maxSize: number;
    eventDate: Date;
    signupStartDate: Date;
    signupEndDate: Date;
    location_City: string;
    location_District: string;
    content: string;
    category: string;
    isDeleted: boolean;
    isVerified: string;
    eventImg: string | null;
  }

  // 게시글 작성 - DB 연동
  const writePostMutation = useMutation(async (postData: WritePostData) => {
    try {
      const response = await customAxios.post("events", postData);
      return response.data;
    } catch (error) {
      console.error("게시글 작성 실패", error);
      throw error;
    }
  });

  // 게시글 취소
  const postCancel = () => {
    navigate("/");
  };

  // 게시글 등록
  const postAdd = async () => {
    try {
      // 필수 입력값 체크
      if (
        !eventName ||
        !eventDate ||
        !signupStartDate ||
        !signupEndDate ||
        !content
      ) {
        alert("내용을 모두 입력해주세요!");
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
        location_City,
        location_District,
        content,
        category,
        isDeleted,
        isVerified,
        eventImg,
      };
      await writePostMutation.mutateAsync(postData);
      toast.success(t("게시글이 등록되었습니다."), {
        className: "toast-success toast-container",
      });
      navigate("/");
    } catch (error) {
      console.log("게시글 작성 실패", error);
    }
  };

  return (
    <St.PostSection>
      <St.SelectorWrap>
        {/* 카테고리 */}
        <Selector
          options={categoryOptionsData?.data.category?.map((item:string) => ({
            value: t(item),
            label: t(item),
          }))||[]}
          value={category}
          onChange={(selectedOption: React.ChangeEvent<HTMLSelectElement>) => {
            setCategory(selectedOption.target.value);
          }}
        ></Selector>

        {/* 위치인증 */}
        <Selector
          options={locationOptionsData?.data?.verify.map((item:string) => ({
            value: t(item),
            label: t(item),
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
            value={eventDate}
            onChange={(e) => {
              setEventDate(e.target.value);
            }}
          />
        </div>
        <div>
          <p>{t("참가신청 기간")}</p>
          <input
            type="date"
            value={signupStartDate}
            onChange={(e) => {
              setSignupStartDate(e.target.value);
            }}
          />
          &nbsp;~&nbsp;
          <input
            type="date"
            value={signupEndDate}
            onChange={(e) => {
              setSignupEndDate(e.target.value);
            }}
          />
        </div>
        <div>
          <p>{t("모임주소")}</p>
          <Selector
            options={(sidoOptionsData||[])?.map((item) => ({
              value: item.doName,
              label: item.doName,
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
              value: option.guName,
              label: option.guName,
            }))}
            value={location_District}
            onChange={(
              selectedOption: React.ChangeEvent<HTMLSelectElement>
            ) => {
              setLocation_District(selectedOption.target.value);
            }}
          ></Selector>
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
        <Button onClick={postAdd}>{t("등록")}</Button>
      </St.ButtonWrap>
    </St.PostSection>
  );
};

export default WritePost;
