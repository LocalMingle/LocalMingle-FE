import * as ST from "./STChatList";
import { SocketContext } from "../SocketContext";
import { useState, useEffect, useContext, useRef } from "react";
import { MessageData, EventDetailResponse } from "../ChatTypes";

type ChatListProps = {
  eventId: number;
  eventDetail: EventDetailResponse;
};

const ChatList = (props: ChatListProps) => {
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
        setMessages((prevMessages) => [...prevMessages, messageData]);
        if (chatListRef.current) {
          chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
      });

      socket.on("user_connected", (nickname: string) => {
        let userProfileImg = "";

        if (nickname === hostNickname) {
          userProfileImg = hostProfileImg;
        } else if (guestNicknames.includes(nickname)) {
          const idx = guestNicknames.indexOf(nickname);
          userProfileImg = guestProfileImgs[idx];
        }
        const newUserMessage: MessageData = {
          message: `${nickname}님이 들어왔어.`,
          nickname,
          profileImg: userProfileImg,
          time: new Date().toISOString(),
          roomId: props.eventId,
        };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      });

      socket.on("disconnect_user", (nickname: string) => {
        let userProfileImg = "";

        if (nickname === hostNickname) {
          userProfileImg = hostProfileImg;
        } else if (guestNicknames.includes(nickname)) {
          const idx = guestNicknames.indexOf(nickname);
          userProfileImg = guestProfileImgs[idx];
        }
        const disconnectedUserMessage: MessageData = {
          message: `${nickname}님이 나갔어.`,
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
  ]);

  return (
    <ST.ChatListContainer ref={chatListRef}>
      {messages.map((msg, index) => {
        let nickname = "";
        let profileImg = "";

        if (hostNickname === msg.nickname) {
          nickname = hostNickname;
          profileImg = hostProfileImg;
        } else if (guestNicknames.includes(msg.nickname)) {
          nickname = msg.nickname;
          const idx = guestNicknames.indexOf(msg.nickname);
          profileImg = guestProfileImgs[idx];
        }

        return (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <img
              src={profileImg}
              alt={`${nickname}의 프로필 이미지`}
              style={{ width: "50px", marginRight: "10px" }}
            />
            <div>{nickname}</div>
            <ST.MessageItem>{msg.message}</ST.MessageItem>
          </div>
        );
      })}
    </ST.ChatListContainer>
  );
};

export default ChatList;
