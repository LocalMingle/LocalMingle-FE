import * as ST from "./STChatBox";
import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import { EventDetailResponse } from "../ChatTypes";

type ChatBoxProps = {
  currentUserId: number;
  eventId: number;
  eventDetail: EventDetailResponse | null;
};

type MessageType = {
  message: string;
  nickname: string;
  profileImg: string;
  time: string;
  roomId: number;
  userId: number;
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

const ChatBox = (props: ChatBoxProps) => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const { currentUserNickname, currentUserProfileImg } = getCurrentUserDetails(
    props.eventDetail,
    props.currentUserId
  );

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      const currentTime = new Date().toLocaleTimeString();
      const messageData = {
        message: message,
        nickname: currentUserNickname || "알 수 없음",
        profileImg: currentUserProfileImg || "기본이미지URL",
        time: currentTime,
        roomId: props.eventId,
      };
      socket.emit("submit_chat", messageData);
      setMessage("");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("new_chat", (newMessage: MessageType) => {
        console.log("새 메시지:", newMessage);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, newMessage];
          console.log("ChatBox 업데이트된 메시지:", newMessages); // 여기에 추가
          return newMessages;
        });
      });
      return () => {
        socket.off("new_chat");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("error", (errorMessage: string) => {
        setError(errorMessage);
      });
      return () => {
        socket.off("error");
      };
    }
  }, [socket]);

  return (
    <ST.MessageContainer>
      {messages.map((message, index) =>
        message.userId === props.currentUserId ? (
          <ST.MyMessage key={index}>{message.message}</ST.MyMessage>
        ) : (
          <ST.OtherMessage key={index}>{message.message}</ST.OtherMessage>
        )
      )}
      <ST.InputContainer>
        <ST.InputField
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSendMessage();
              e.preventDefault();
            }
          }}
          placeholder="내용을 입력하세요"
          maxLength={200}
        />
        <ST.SendButton onClick={handleSendMessage}>전송</ST.SendButton>
      </ST.InputContainer>
      {error && <ST.ErrorMessage>{error}</ST.ErrorMessage>}
    </ST.MessageContainer>
  );
};

export default ChatBox;
