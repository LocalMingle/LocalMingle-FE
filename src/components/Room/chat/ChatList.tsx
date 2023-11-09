import * as ST from "./STChatList";
import { SocketContext } from "../SocketContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { MessageData, EventDetailResponse } from "../ChatTypes";
// import { useLanguage } from "../../../util/Locales/useLanguage";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

type ChatListProps = {
  eventId: number;
  eventDetail: EventDetailResponse;
  currentUserId: number;
};

type UserListPayload = {
  nickname: string;
  profileImg: string;
  userListArr: { userId: number; nickname: string; profileImg: string }[];
};

const getCurrentUserDetails = (
  eventDetail: EventDetailResponse | null,
  currentUserId: number
) => {
  let currentUserNickname;
  let currentUserProfileImg;

  if (eventDetail?.hostUser[0]?.UserId === currentUserId) {
    currentUserNickname = eventDetail?.hostUser[0]?.nickname;
    currentUserProfileImg = eventDetail?.hostUser[0]?.profileImg;
  } else {
    const currentUser = eventDetail?.guestUser.find((group) =>
      group.some((user) => user.UserId === currentUserId)
    );

    if (currentUser) {
      const guestUser = currentUser.find(
        (user) => user.UserId === currentUserId
      );

      if (guestUser) {
        currentUserNickname = guestUser.nickname;
        currentUserProfileImg = guestUser.profileImg;
      }
    }
  }
  return { currentUserNickname, currentUserProfileImg };
};

const ChatList = (props: ChatListProps) => {
  // const { t } = useLanguage();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const socket = useContext(SocketContext);
  const chatListRef = useRef<HTMLDivElement>(null);
  const { currentUserProfileImg } = getCurrentUserDetails(
    props.eventDetail,
    props.currentUserId
  );

  // 현재 시간을 문자열로 가져오는 함수
  const getCurrentTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    const twelveHour = hours % 12 || 12;
    return `${ampm} ${twelveHour}:${minutes}`;
  }, []);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      // 채팅 이력 수신
      socket.on("chat_history", (chatHistory: MessageData[]) => {
        const roomChatHistory = chatHistory.filter(
          (msg) => msg.roomId === props.eventId
        );
        setMessages(roomChatHistory);
      });

      // 새로운 채팅 메시지 수신
      socket.on("new_chat", (messageData: MessageData) => {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      });

      // 새로운 사용자가 채팅방에 참가했을 때
      socket.on("user_connected", (payload: UserListPayload) => {
        console.log("New user data received:", payload);
        const { nickname, profileImg } = payload;
        const newUserMessage: MessageData = {
          message: `${nickname}님이 채팅방에 참가하셨습니다.`,
          nickname,
          profileImg: profileImg || currentUserProfileImg,
          time: getCurrentTime(),
          roomId: props.eventId,
        };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      });

      // 사용자가 채팅방을 떠났을 때
      socket.on("disconnect_user", (payload: UserListPayload) => {
        const { nickname, profileImg } = payload;
        const leftUserMessage: MessageData = {
          message: `${nickname}님이 채팅방을 떠났습니다.`,
          nickname,
          profileImg: profileImg || currentUserProfileImg,
          time: getCurrentTime(),
          roomId: props.eventId,
        };
        setMessages((prevMessages) => [...prevMessages, leftUserMessage]);
      });

      // 이벤트 리스너 해제
      return () => {
        socket.off("chat_history");
        socket.off("new_chat");
        socket.off("user_connected");
        socket.off("disconnect_user");
      };
    }
  }, [socket, props.eventId, getCurrentTime, currentUserProfileImg]);

  const handleLeaveRoomAndNavigate = useCallback(() => {
    if (socket) {
      socket.emit("leave_room", { roomId: props.eventId });
    }
    navigate("/");
  }, [socket, props.eventId, navigate]);

  return (
    <ST.ChatListContainer ref={chatListRef}>
      <ST.Header>
        <ST.Icon icon={faChevronLeft} onClick={handleLeaveRoomAndNavigate} />
        <ST.EventName>{props.eventDetail.event.eventName}</ST.EventName>
        <div></div>
      </ST.Header>
      {messages.map((msg, index) => {
        const key = `${msg.roomId}-${msg.time}-${index}`;
        const isMyMessage = msg.userId === props.currentUserId;

        return (
          <ST.MessageWrapper isMyMessage={isMyMessage} key={key}>
            {!isMyMessage && (
              <ST.ProfileContainer>
                <ST.ProfileImage src={msg.profileImg} alt={`${msg.nickname}`} />
                <ST.Nickname>{msg.nickname}</ST.Nickname>
              </ST.ProfileContainer>
            )}
            <div>
              <ST.MessageItem isMyMessage={isMyMessage}>
                <div>{msg.message}</div>
              </ST.MessageItem>
              <ST.Timestamp isMyMessage={isMyMessage}>{msg.time}</ST.Timestamp>
            </div>
          </ST.MessageWrapper>
        );
      })}
    </ST.ChatListContainer>
  );
};

export default ChatList;
