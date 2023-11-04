import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useRecoilState } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as St from "./STViewPost";
import Modal from "../../common/Modal/Modal";
import Button from "../../common/Button/Button";
import { userState } from "../../../recoil/atoms/UserState";
import { modalState } from "../../../recoil/atoms/ModalState";
import { useLanguage } from "../../../util/Locales/useLanguage";
import {
  getEventDetail,
  EventDetailResponse,
  joinEvent,
} from "../../../api/api";

type GuestUser = {
  userDetailId: number;
  UserId: number;
  nickname: string;
  intro: string;
  profileImg: string;
  createdAt: Date;
  updatedAt: Date;
};

const ViewPost: React.FC = () => {
  const user = useRecoilValue(userState);
  const loggedInUserId = user.userId;
  const { eventId } = useParams<{ eventId?: string }>();
  const [, setIsModalOpen] = useRecoilState(modalState);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const {
    data: eventDetail,
    isLoading,
    isError,
    refetch,
  } = useQuery<EventDetailResponse, Error>(
    ["eventDetail", eventId],
    () => getEventDetail(parseInt(eventId || "", 10)),
    {
      enabled: !!eventId,
      retry: 1,
      onError: () => {
        navigate("/");
        toast.error(t("로그인시 확인이 가능합니다 😢"), {
          className: "toast-error toast-container",
        });
      },
    }
  );

  const isAuthor = eventDetail?.hostUser.some(
    (host) => host.UserId === loggedInUserId
  );
  const isJoined = eventDetail?.guestUser.some((guestGroup) =>
    guestGroup.some((guest) => guest.UserId === loggedInUserId)
  );

  const handleJoinEvent = async () => {
    const currentGuestCount = eventDetail?.guestUser.length || 0;
    const currentMaxSize = eventDetail?.event?.maxSize || 0;
    if (currentGuestCount >= currentMaxSize) {
      toast.error(t("이미 마감된 모임입니다 😢"), {
        className: "toast-error toast-container",
      });
      return;
    }
    try {
      await joinEvent(parseInt(eventId || "", 10));
      toast.success(t("이벤트에 참가했어요! 🎉"), {
        className: "toast-success toast-container",
      });
      refetch();
    } catch (error) {
      toast.error(t("이벤트 참가에 실패했어요 😢"), {
        className: "toast-error toast-container",
      });
    }
  };

  if (isLoading) return null;
  if (isError || !eventDetail) return null;

  const {
    category,
    eventName,
    createdAt,
    eventDate,
    signupStartDate,
    signupEndDate,
    location_City,
    location_District,
    maxSize,
    content,
  } = eventDetail.event;

  const { nickname, profileImg } = eventDetail.hostUser[0];
  const flattenedGuests = [
    ...eventDetail.hostUser,
    ...eventDetail.guestUser.reduce((acc, val) => acc.concat(val), []),
  ];

  // 참가리 리스트 모달창 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 채팅하기 버튼 클릭 시
  const handleChat = () => {
    window.location.href = `/chat/${eventId}`;
  };

  return (
    <St.ViewSection>
      {isAuthor ? (
        // 작성자일 때
        <St.TitleWrap>
          <St.Category>{t(category)}</St.Category>
          <St.EventName>{eventName}</St.EventName>
        </St.TitleWrap>
      ) : (
        // 이벤트 참여자일 때
        <St.TitleWrap>
          <St.Category>{t(category)}</St.Category>
          {isJoined === true ? (
            <St.Join>
              <h1>{t(eventName)}</h1>
              <span>{t("참가완료")}</span>
            </St.Join>
          ) : (
            <St.NotJoin>
              <h1>{t(eventName)}</h1>
            </St.NotJoin>
          )}
        </St.TitleWrap>
      )}
      {/* 작성자 프로필 */}
      <St.ProfileWrap>
        <St.ProfileImg src={profileImg} alt="Profile Image" />
        <div>
          <St.Nickname>{nickname}</St.Nickname>
          <St.CreatedAt>
            {new Date(createdAt).toLocaleDateString()}
          </St.CreatedAt>
        </div>
      </St.ProfileWrap>

      {/* 게시글 정보 */}
      <St.Infowrap>
        <St.EventDate>
          <p>{t("모임일시")}</p>
          <span>{new Date(eventDate).toLocaleDateString()}</span>
        </St.EventDate>
        <St.SignupDate>
          <p>{t("참가신청 기간")}</p>
          <span>
            {new Date(signupStartDate).toLocaleDateString()}
            &nbsp; ~ &nbsp;
            {new Date(signupEndDate).toLocaleDateString()}
          </span>
        </St.SignupDate>
        <St.EventLocation>
          <p>{t("모임주소")}</p>
          <span>{t(location_City)}</span>
          &nbsp;
          <span>{t(location_District)}</span>
        </St.EventLocation>
        <St.MaxSize>
          <p>{t("모집인원")}</p>
          <span>
            {eventDetail.guestList + 1} / {maxSize}
          </span>
          &nbsp;{t("명")}
        </St.MaxSize>
        <St.GuestUserContainer>
          <p>{t("참가리스트")}</p>
          <span onClick={openModal}>
            {flattenedGuests
              .slice(0, 3)
              .map((guest: GuestUser, idx: number) => (
                <St.GuestProfileImg
                  key={idx}
                  src={guest.profileImg}
                  alt={`Guest User ${idx}`}
                />
              ))}
            {flattenedGuests.length > 3 && <St.MoreUsers>...</St.MoreUsers>}
          </span>
        </St.GuestUserContainer>
        <Modal />
      </St.Infowrap>

      {/* 게시글 컨텐츠 */}
      <St.ContentWrap>
        <St.Content>{content}</St.Content>
      </St.ContentWrap>

      <St.ButtonWrap>
        {isAuthor ? (
          <div>
            <Button bgcolor={"#9ECBFA"} onClick={handleChat}>
              {t("채팅하기")}
            </Button>
          </div>
        ) : (
          <div>
            {/* 참가했을 때 */}
            {isJoined === true && (
              <Button bgcolor={"#9ECBFA"} onClick={handleChat}>
                {t("채팅하기")}
              </Button>
            )}
            {/* 참가하지 않았을 때 */}
            {isJoined === false && (
              <Button bgcolor={"#F7D16F"} onClick={handleJoinEvent}>
                {t("참가하기")}
              </Button>
            )}
          </div>
        )}
      </St.ButtonWrap>
    </St.ViewSection>
  );
};

export default ViewPost;
