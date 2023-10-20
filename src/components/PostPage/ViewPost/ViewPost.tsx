import React, { useState, useEffect } from "react";
import * as St from "./STViewPost";
import {
  getEventDetail,
  EventDetailResponse,
  toggleParticipation,
} from "../../../api/api";
import { useParams } from "react-router-dom";

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
  const { eventId } = useParams<{ eventId?: string }>();
  const [eventDetail, setEventDetail] = useState<EventDetailResponse | null>(
    null
  );
  const [isAuthor, setIsAuthor] = useState(false);
  const [isJoined, setIsJoined] = useState<boolean | null>(null);
  // const [isVerified, setIsVerified] = useState(false);
  const loggedInUserId = Number(localStorage.getItem("userId"));

  const handleToggleParticipation = async () => {
    console.log("버튼 함수가 호출됬다");
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
  return (
    <St.Container>
      <St.Category>{category}</St.Category>

      <St.EventName>{eventName}</St.EventName>

      <St.ProfileImg src={profileImg} alt="Profile Image" />

      <St.Nickname>{nickname}</St.Nickname>
      <St.CreatedAt>{new Date(createdAt).toLocaleDateString()}</St.CreatedAt>

      <St.EventDate>
        모임일시: {new Date(eventDate).toLocaleDateString()}
      </St.EventDate>
      <St.SignupDate>
        참가신청 기간: {new Date(signupStartDate).toLocaleDateString()} ~{" "}
        {new Date(signupEndDate).toLocaleDateString()}
      </St.SignupDate>

      <St.EventLocation>모임주소: {eventLocation}</St.EventLocation>
      <St.MaxSize>모집인원: {maxSize}명</St.MaxSize>

      <St.GuestUserContainer>
        {flattenedGuests.slice(0, 3).map((guest: GuestUser, idx: number) => (
          <St.GuestProfileImg
            key={idx}
            src={guest.profileImg}
            alt={`Guest User ${idx}`}
          />
        ))}
        {flattenedGuests.length > 3 && <St.MoreUsers>...</St.MoreUsers>}
      </St.GuestUserContainer>

      <St.Content>{content}</St.Content>

      {/* 작성자일 때 */}
      {isAuthor ? (
        <div>{<St.ChatButton>채팅하기</St.ChatButton>}</div>
      ) : (
        <div>
          {/* 이벤트 참여자일 때 */}
          {isJoined !== null && (
            <St.Button onClick={handleToggleParticipation}>
              {isJoined ? "참가취소" : "참가하기"}
            </St.Button>
          )}
          {isJoined && <St.ChatButton>채팅하기</St.ChatButton>}
        </div>
      )}
    </St.Container>
  );
};

export default ViewPost;
