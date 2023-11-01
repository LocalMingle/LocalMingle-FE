import styled from "styled-components";

interface MessageItemProps {
  isMyMessage: boolean;
}

interface MessageWrapperProps {
  isMyMessage: boolean;
}

export const ChatListContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
`;

export const MessageItem = styled.div<MessageItemProps>`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  margin: 5px 0;
  background-color: ${(props) => (props.isMyMessage ? "#6EC0F9" : "#E7E7E7")};
  align-self: ${(props) => (props.isMyMessage ? "flex-end" : "flex-start")};
  max-width: 70%;
  word-wrap: break-word;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const MessageWrapper = styled.div<MessageWrapperProps>`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) =>
    props.isMyMessage ? "flex-end" : "flex-start"};
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #292d32;
  margin-right: 10px;
`;

export const Nickname = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 3px;
  margin-bottom: 5px;
  margin-right: 8px;
`;
