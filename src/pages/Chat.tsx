import React, { useState, useEffect } from "react";
import ChatBox from "../components/Room/chat/ChatBox";
import ChatList from "../components/Room/chat/ChatList";
import { Header } from "../components/common/Header";
import { getEventDetail } from "../api/api";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms/UserState";
import { EventDetailResponse } from "../components/Room/ChatTypes";
import {
  MyPageContainer,
  MyPageWrap,
} from "../components/Room/chat/STChatList";

const Chat: React.FC = () => {
  const [eventDetail, setEventDetail] = useState<EventDetailResponse | null>(
    null
  );
  const { eventId: eventIdString } = useParams<{ eventId: string }>();
  const eventId = eventIdString ? parseInt(eventIdString, 10) : null;

  const currentUser = useRecoilValue(userState);
  const currentUserId = currentUser.userId;

  const fetchEventDetail = async (id: number) => {
    try {
      const detail = await getEventDetail(id);
      setEventDetail(detail);
    } catch (error) {
      console.error("이벤트 상세 정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (eventId !== null) {
      fetchEventDetail(eventId);
    }
  }, [eventId]);

  if (!eventDetail || currentUserId === null || eventId === null) return null;

  return (
    <>
      <Header></Header>
      <MyPageContainer>
        <MyPageWrap>
          <ChatList
            eventId={eventId}
            eventDetail={eventDetail}
            currentUserId={currentUserId}
          ></ChatList>
          <ChatBox
            currentUserId={currentUserId}
            eventId={eventId}
            eventDetail={eventDetail}
          ></ChatBox>
        </MyPageWrap>
      </MyPageContainer>
    </>
  );
};

export default Chat;
