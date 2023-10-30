import { createContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);
