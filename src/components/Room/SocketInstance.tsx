// import { createContext, useEffect, useState, ReactNode } from "react";
// import io, { Socket } from "socket.io-client";

// export const SocketContext = createContext<Socket | null>(null);

// interface SocketProviderProps {
//   children: ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketInstance = io(
//       `${import.meta.env.VITE_REACT_APP_URL}/chattings`,
//       {
//         reconnection: true,
//         reconnectionAttempts: 10,
//         reconnectionDelay: 3000,
//       }
//     );
//     socketInstance.on("connect_error", () => {
//       console.error("소켓 연결에 문제가 있어!");
//     });
//     socketInstance.on("reconnect_failed", () => {
//       console.error("소켓 재연결 실패!");
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };
