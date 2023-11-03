import React from "react";
import * as St from "./STJoinList";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
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

const JoinList: React.FC = () => {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const navigate = useNavigate();
  const { t } = useLanguage();

  const fetchEvents = async () => {
    if (!userId) throw new Error("사용자가 로그인하지 않았습니다.");
    const joinedEvents: Event[] = await getJoinedEvents(Number(userId));
    return joinedEvents.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const { data: events = [], refetch } = useQuery<Event[], Error>(
    ["events", userId],
    fetchEvents,
    {
      enabled: !!userId,
      initialData: [],
    }
  );

  const mutation = useMutation(cancelEventJoin, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleCancel = async (eventId: number) => {
    try {
      const result = await mutation.mutateAsync(eventId);
      if (result === "cancelled") {
        toast.success(t("참석이 취소되었습니다."), {
          className: "toast-success toast-container",
        });
      }
    } catch (error) {
      // console.error("참석 취소 중 오류 발생:", error);
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
