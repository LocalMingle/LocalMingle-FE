import React, { useEffect, useState, useCallback } from "react";
import * as St from "./STJoinList";
import { getJoinedEvents, cancelParticipation } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atoms/UserState";
import toast from "react-hot-toast";

type Event = {
  id?: number;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  category: string;
  createdAt: string;
  eventId: number;
};

const JoinList: React.FC = () => {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const fetchEvents = useCallback(async () => {
    try {
      if (!userId) throw new Error("User not logged in");

      const joinedEvents: Event[] = await getJoinedEvents(Number(userId));

      const sortedEvents = joinedEvents.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
      });

      setEvents(sortedEvents);
    } catch (error) {
      console.error("이벤트 불러오기 오류:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchEvents();
  }, [isLoading, fetchEvents]);

  const handleCancel = async (eventId: number) => {
    try {
      await cancelParticipation(eventId);
      await fetchEvents();
      await setIsLoading(!isLoading);
      toast.success(t("참석이 취소되었습니다."), {
        className: "toast-success toast-container",
      });
    } catch (error) {
      console.error("참석 취소 중 오류 발생:", error);
    }
  };

  const handlePostClick = (eventId: number) => {
    navigate(`/postview/${eventId}`);
  };

  return (
    <>
      {events.length > 0 ? (
        <St.MyPageContainer>
          <St.MyPageWrap>
            <div>
              {events.map((event) => (
                <St.UserJoinForm key={event.createdAt}>
                  <St.UserJoinFormWrap>
                    <h2 onClick={() => handlePostClick(event.eventId)}>
                      {event.eventName}
                    </h2>
                    <St.CategoryLocationWrapper>
                      <span>{event.category}</span>
                      <span>{event.eventDate}</span>
                    </St.CategoryLocationWrapper>
                  </St.UserJoinFormWrap>
                  <St.UserPostButtonWrap>
                    <button
                      onClick={() => {
                        handleCancel(event.eventId);
                      }}
                    >
                      {t("참가취소")}
                    </button>
                  </St.UserPostButtonWrap>
                </St.UserJoinForm>
              ))}
            </div>
          </St.MyPageWrap>
        </St.MyPageContainer>
      ) : (
        <St.MyPageContainer>
          <St.MyPageWrap>
            <St.NoEventMessage>
              {t("참여하신 이벤트가 없습니다.")}
            </St.NoEventMessage>
          </St.MyPageWrap>
        </St.MyPageContainer>
      )}
    </>
  );
};

export default JoinList;
