import React, { useEffect, useState } from "react";
import * as St from "./STJoinList";
import { getJoinedEvents, cancelParticipation } from "../../../api/api";
import { useNavigate } from "react-router-dom";

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
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  // 정보 갱신 위한 useState
  const [isUpdate, setIsUpdate] = useState(false);

  // 서버에서 받아온 참가목록 관련 데이터를 확인
  console.log({ events });

  useEffect(() => {
    async function fetchEvents() {
      try {
        const userId = localStorage.getItem("userId");
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
    }

    fetchEvents();
  }, [isUpdate]);

  const handleCancel = async (eventId: number) => {
    console.log({ eventId });

    try {
      const response = await cancelParticipation(eventId);
      if (response?.message === `${eventId}번 모임 참석 취소!`) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
      }
      setIsUpdate(!isUpdate);
    } catch (error) {
      console.error("참석 취소 중 오류 발생:", error);
    }
  };

  return (
    <>
      {events.map((event) => (
        <St.JoinContainer key={event.createdAt}>
          <div onClick={() => navigate(`/postview/${event.id}`)}>
            <label>{event.eventName}</label>
            <St.CategoryLocationWrapper>
              <span>{event.category}</span>
              <span>{event.eventDate}</span>
            </St.CategoryLocationWrapper>
          </div>
          <div
            onClick={() => {
              handleCancel(event.eventId);
            }}
          >
            <button>참가취소</button>
          </div>
        </St.JoinContainer>
      ))}
    </>
  );
};

export default JoinList;
