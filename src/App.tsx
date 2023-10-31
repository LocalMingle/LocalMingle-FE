import "./App.css";
import Router from "../src/router/Router";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { SocketContext } from "../src/components/Room/SocketContext";
import io, { Socket } from "socket.io-client";

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // const socketInstance = io(`${import.meta.env.VITE_REACT_APP_URL}`, {
    //   reconnection: true,
    //   reconnectionAttempts: 10,
    //   reconnectionDelay: 3000,
    // });
    // socketInstance.on("connect_error", () => {
    //   console.error("소켓 연결에 문제가 있어!");
    // });
    // socketInstance.on("reconnect_failed", () => {
    //   console.error("소켓 재연결 실패!");
    // });
    // setSocket(socketInstance);
    // return () => {
    //   socketInstance.disconnect();
    // };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Toaster reverseOrder={false} />
      <Router />
    </SocketContext.Provider>
  );
};

export default App;
