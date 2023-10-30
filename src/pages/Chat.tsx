import React from "react";
import ChatBox from "../components/Room/chat/ChatBox";
import ChatList from "../components/Room/chat/ChatList";
import { Header } from "../components/common/Header";

const Chat: React.FC = () => {
  return (
    <>
      <Header></Header>
      <ChatList></ChatList>
      <ChatBox></ChatBox>
      {/* <Outlet></Outlet> */}
    </>
  );
};

export default Chat;
