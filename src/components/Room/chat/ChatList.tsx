import * as ST from "./STChatList";
import { SocketContext } from "../SocketContext";
import { useState, useEffect, useContext } from "react";

const ChatList = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("new_chat", (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("user_connected", (nickname: string) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          `${nickname}님이 들어왔어.`,
        ]);
      });

      socket.on("disconnect_user", (nickname: string) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          `${nickname}님이 나갔어.`,
        ]);
      });

      return () => {
        socket.off("new_chat");
        socket.off("user_connected");
        socket.off("disconnect_user");
      };
    }
  }, [socket]);

  return (
    <ST.ChatListContainer>
      {messages.map((msg, index) => (
        <ST.MessageItem key={index}>{msg}</ST.MessageItem>
      ))}
    </ST.ChatListContainer>
  );
};

export default ChatList;
