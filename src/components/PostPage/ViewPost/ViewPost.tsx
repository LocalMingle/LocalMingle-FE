import React, { useState, useEffect } from "react";
import * as St from "./STViewPost";
import Button from "../../common/Button/Button";
import {
  getEventDetail,
  EventDetailResponse,
  toggleParticipation,
} from "../../../api/api";
import { useParams } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../../../recoil/atoms/ModalState";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atoms/UserState";

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
  const [eventDetail, setEventDetail] = useState<EventDetailResponse | null>(
    null
  );
  const [isAuthor, setIsAuthor] = useState(false);
  const [isJoined, setIsJoined] = useState<boolean | null>(null);
  const [, setIsModalOpen] = useRecoilState(modalState);
  const { t } = useLanguage();
  const handleToggleParticipation = async () => {
    if (!eventId) return;
    const eventIdNumber = parseInt(eventId, 10);

    try {
      const result = await toggleParticipation(eventIdNumber);
      if (result === "joined") {
        setIsJoined(true);
      } else if (result === "cancelled") {
        setIsJoined(false);
      } else {
        console.error("알 수 없는 응답:", result);
      }
    } catch (error) {
      console.error("토글 참가 중 오류 발생:", error);
    }
    setIsJoined(!isJoined);
  };

  useEffect(() => {
    if (!eventId) return;
    const eventIdNumber = parseInt(eventId, 10);

    const fetchEventDetail = async () => {
      try {
        const data = await getEventDetail(eventIdNumber);
        setEventDetail(data);

        if (data) {
          const authorStatus = loggedInUserId === data.hostUser[0].UserId;
          setIsAuthor(authorStatus);
          console.log("로그인한 사용자의 ID:", loggedInUserId);
          console.log("작성자인가요?:", authorStatus);
          if (isJoined === null) {
            const isUserJoined = data.guestUser.some((guestGroup) =>
              guestGroup.some((guest) => guest.UserId === loggedInUserId)
            );
            setIsJoined(isUserJoined);
          }
        }
      } catch (error) {
        console.error("이벤트 정보 가져오기 실패:", error);
      }
    };

    fetchEventDetail();
  }, [eventId, loggedInUserId, isJoined]);

  if (!eventDetail) return <div>Loading...</div>;
  const {
    category,
    eventName,
    createdAt,
    eventDate,
    signupStartDate,
    signupEndDate,
    eventLocation,
    maxSize,
    content,
  } = eventDetail.event;

  const { nickname, profileImg } = eventDetail.hostUser[0];
  const flattenedGuests = eventDetail.guestUser.reduce(
    (acc, val) => acc.concat(val),
    []
  );

  // 참가리 리스트 모달창 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 채팅하기 버튼 클릭 시
  const handdleChat = () => {
    alert("[TEST] 채팅방으로 이동!");
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
          <span>{eventLocation}</span>
        </St.EventLocation>
        <St.MaxSize>
          <p>{t("모집인원")}</p>
          <span>{maxSize}</span>&nbsp;{t("명")}
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

      {/* 버튼 */}
      <St.ButtonWrap>
        {/* 작성자일 때 */}
        {isAuthor ? (
          <div>
            {
              <Button bgcolor={"#9ECBFA"} onClick={handdleChat}>
                {t("채팅하기")}
              </Button>
            }
          </div>
        ) : (
          <div>
            {/* 이벤트 참여자일 때 */}
            {isJoined !== null && (
              <Button
                bgcolor={isJoined ? "#E7E7E7" : "#F7D16F"}
                onClick={handleToggleParticipation}
              >
                {isJoined ? t("참가취소") : t("참가하기")}
              </Button>
            )}
            {isJoined && (
              <Button bgcolor={"#9ECBFA"} onClick={handdleChat}>
                {t("채팅하기")}
              </Button>
            )}
          </div>
        )}
      </St.ButtonWrap>
    </St.ViewSection>
  );
};

export default ViewPost;
