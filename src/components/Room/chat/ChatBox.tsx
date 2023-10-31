import * as ST from "./STChatBox";
import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import { EventDetailResponse } from "../ChatTypes";

type ChatBoxProps = {
  currentUserId: number;
  eventId: number;
  eventDetail: EventDetailResponse | null;
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
      {/* 여기에는 나의 메시지와 상대방의 메시지가 들어갈 예정.
      <MyMessage>안녕!</MyMessage>
      <OtherMessage>안녕하세요!</OtherMessage> 
      이런 식으로 추가 */}

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
