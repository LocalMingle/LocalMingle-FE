import React, { useEffect, useState, useCallback } from "react";
import * as St from "./STJoinList";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../../recoil/atoms/UserState";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { getJoinedEvents, cancelEventJoin } from "../../../api/api";

type Event = {
  id?: number;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  category: string;
  createdAt: string;
  eventId: number;
};
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}/${month}/${day}`;
};

const JoinList: React.FC = () => {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const joinedEvents: Event[] = await getJoinedEvents(Number(userId));
      const formattedEvents = joinedEvents.map((event) => ({
        ...event,
        createdAt: formatDate(event.createdAt),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("이벤트 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEvents();
  }, [userId, fetchEvents]);

  const handleCancel = async (eventId: number) => {
    const toastId = toast(
      <St.ToastWrapper>
        {t("참가를 정말로 취소하시겠습니까?")}
        <St.ConfirmButton
          onClick={async () => {
            try {
              const result = await cancelEventJoin(eventId);
              if (result === "cancelled") {
                toast.success(t("참석이 취소되었습니다."), {
                  className: "toast-success toast-container",
                });
                fetchEvents();
              } else {
                toast.error(t("참석 취소에 실패했습니다."), {
                  className: "toast-error toast-container",
                });
              }
            } catch (error) {
              console.error("참석 취소 중 오류 발생:", error);
              toast.error(t("참석 취소에 실패했습니다."), {
                className: "toast-error toast-container",
              });
            }
            toast.dismiss(toastId);
          }}
        >
          {t("참가취소")}
        </St.ConfirmButton>
        <St.CancelButton onClick={() => toast.dismiss(toastId)}>
          {t("닫기")}
        </St.CancelButton>
      </St.ToastWrapper>
    );
  };

  const handlePostClick = (eventId: number) => {
    navigate(`/postview/${eventId}`);
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

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
                      <span>{t(event.category)}</span>
                      <span>{formatDate(event.eventDate)}</span>
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
