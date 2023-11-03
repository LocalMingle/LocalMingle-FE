import * as ST from "./STChatList";
import { SocketContext } from "../SocketContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { MessageData, EventDetailResponse } from "../ChatTypes";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

type ChatListProps = {
  eventId: number;
  eventDetail: EventDetailResponse;
  currentUserId: number;
};
type UserConnectedData = {
  nickname: string;
  profileImg?: string;
};

const ChatList = (props: ChatListProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const socket = useContext(SocketContext);
  const chatListRef = useRef<HTMLDivElement>(null);
  null;

  const navigateToEventDetail = () => {
    navigate("/");
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    const twelveHour = hours % 12 || 12;

    return `${ampm} ${twelveHour}:${minutes}:${seconds}`;
  };

  const hostNickname = props.eventDetail?.hostUser[0]?.nickname;
  const hostProfileImg = props.eventDetail?.hostUser[0]?.profileImg;
  const guestNicknames = props.eventDetail?.guestUser
    .flat()
    .map((user) => user.nickname);
  const guestProfileImgs = props.eventDetail?.guestUser
    .flat()
    .map((user) => user.profileImg);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("new_chat", (messageData: MessageData) => {
        // console.log("ChatList에서 새로운 채팅이 도착했어:", messageData);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, messageData];
          // console.log("ChatList 업데이트된 메시지:", newMessages);
          return newMessages;
        });
      });

      socket.on("user_connected", (userData: UserConnectedData) => {
        const nickname = userData.nickname;
        let userProfileImg = userData.profileImg || "";

        if (nickname === hostNickname) {
          userProfileImg = hostProfileImg;
        } else if (guestNicknames.includes(nickname)) {
          const idx = guestNicknames.indexOf(nickname);
          userProfileImg = guestProfileImgs[idx];
        }
        const newUserMessage: MessageData = {
          message: `${nickname}${t("님이 들어왔습니다.")}`,
          nickname,
          profileImg: userProfileImg,
          time: getCurrentTime(),
          roomId: props.eventId,
        };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      });

      socket.on("disconnect_user", (userData: UserConnectedData) => {
        // console.log("disconnect_user 이벤트 발생, 받은 데이터:", userData);
        const nickname = userData.nickname;
        let userProfileImg = userData.profileImg || "";

        if (nickname === hostNickname) {
          userProfileImg = hostProfileImg;
        } else if (guestNicknames.includes(nickname)) {
          const idx = guestNicknames.indexOf(nickname);
          userProfileImg = guestProfileImgs[idx];
        }
        const disconnectedUserMessage: MessageData = {
          message: `${nickname}${t("님이 나갔습니다.")}`,
          nickname,
          profileImg: userProfileImg,
          time: getCurrentTime(),
          roomId: props.eventId,
        };
        setMessages((prevMessages) => [
          ...prevMessages,
          disconnectedUserMessage,
        ]);
      });

      return () => {
        socket.off("new_chat");
        socket.off("user_connected");
        socket.off("disconnect_user");
      };
    }
  }, [
    props.eventId,
    socket,
    guestNicknames,
    guestProfileImgs,
    hostNickname,
    hostProfileImg,
    t,
  ]);

  return (
    <ST.ChatListContainer ref={chatListRef}>
      <ST.Header>
        <ST.Icon icon={faChevronLeft} onClick={navigateToEventDetail} />
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
