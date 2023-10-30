import * as St from "./STChatBox";
import { useContext, useState } from "react";
import { SocketContext } from "../SocketContext";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("submit_chat", message);
      setMessage("");
    }
  };

  return (
    <St.MessageContainer>
      {/* 여기에는 나의 메시지와 상대방의 메시지가 들어갈 예정.
      <MyMessage>안녕!</MyMessage>
      <OtherMessage>안녕하세요!</OtherMessage> 
      이런 식으로 추가 */}

      <St.InputContainer>
        <St.InputField
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="내용을 입력하세요"
        />
        <St.SendButton onClick={handleSendMessage}>전송</St.SendButton>
      </St.InputContainer>
    </St.MessageContainer>
  );
};
export default ChatBox;
