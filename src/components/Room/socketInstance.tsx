import io from "socket.io-client";

const socket = io(`${process.env.VITE_REACT_APP_URL!}`, {
  reconnection: true, // 연결이 끊겼을 때 자동으로 재연결 시도
  reconnectionAttempts: 10, // 재연결 시도하는 최대횟수의 시도
  reconnectionDelay: 3000, // 재연결 시도 간격 설정
});
export default socket;
