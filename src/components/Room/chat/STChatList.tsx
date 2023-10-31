import styled from "styled-components";

// 채팅 리스트 컨테이너
export const ChatListContainer = styled.div`
  width: 100%;
  height: 400px; // 원하는 높이로 설정해!
  overflow-y: auto; // 메시지가 너무 많아지면 스크롤
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
`;

export const MessageItem = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px 0;
  background-color: #f5f5f5;
`;

// 각 메시지 스타일 box에서? list에서?
// export const MessageItem = styled.div`
//   padding: 5px 10px;
//   border-radius: 5px;
//   margin: 5px 0;
//   background-color: ${props => props.isMine ? '#A8E6CF' : '#f5f5f5'}; // 내 메시지면 연한 초록색, 아니면 연한 회색
//   align-self: ${props => props.isMine ? 'flex-end' : 'flex-start'};
//   max-width: 70%; // 너무 긴 메시지는 줄바꿈하게
//   word-wrap: break-word;
// `;
