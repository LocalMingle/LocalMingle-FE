import * as ST from "./STChatList";
import { SocketContext } from "../SocketContext";
import { useState, useEffect, useContext, useRef } from "react";
import { MessageData, EventDetailResponse } from "../ChatTypes";
import { useLanguage } from "../../../util/Locales/useLanguage";

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
  const [messages, setMessages] = useState<MessageData[]>([]);
  const socket = useContext(SocketContext);
  const chatListRef = useRef<HTMLDivElement>(null);
  null;

  const hostNickname = props.eventDetail?.hostUser[0]?.nickname;
  const hostProfileImg = props.eventDetail?.hostUser[0]?.profileImg;
  const guestNicknames = props.eventDetail?.guestUser
    .flat()
    .map((user) => user.nickname);
  const guestProfileImgs = props.eventDetail?.guestUser
    .flat()
    .map((user) => user.profileImg);

  useEffect(() => {
    if (socket) {
      socket.on("new_chat", (messageData: MessageData) => {
        console.log("ChatList에서 새로운 채팅이 도착했어:", messageData);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, messageData];
          console.log("ChatList 업데이트된 메시지:", newMessages);
          return newMessages;
        });
        if (chatListRef.current) {
          chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
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
          time: new Date().toISOString(),
          roomId: props.eventId,
        };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      });

      socket.on("disconnect_user", (userData: UserConnectedData) => {
        console.log("disconnect_user 이벤트 발생, 받은 데이터:", userData);
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
          time: new Date().toISOString(),
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
      {messages.map((msg, index) => {
        const key = `${msg.roomId}-${msg.time}-${index}`;
        const isMyMessage = msg.userId === props.currentUserId;

        return (
          <ST.MessageWrapper isMyMessage={isMyMessage} key={key}>
            {!isMyMessage && (
              <div className="profileWrapper">
                <ST.ProfileImage src={msg.profileImg} alt={`${msg.nickname}`} />
                <ST.Nickname className="nickname">{msg.nickname}</ST.Nickname>
              </div>
            )}
            <ST.MessageItem isMyMessage={isMyMessage}>
              {msg.message}
            </ST.MessageItem>
          </ST.MessageWrapper>
        );
      })}
    </ST.ChatListContainer>
  );
};

export default ChatList;
