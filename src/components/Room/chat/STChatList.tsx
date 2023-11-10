import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MessageItemProps {
  isMyMessage: boolean;
}

interface MessageWrapperProps {
  isMyMessage: boolean;
}

interface TimestampProps {
  isMyMessage: boolean;
}

export const MyPageContainer = styled.div`
  position: relative;
  z-index: 10;
  top: -6px;
  border: 1px solid #e7e7e7;
  border-radius: 34px;
  padding: 5px;
  background: #fff;
  min-height: 630px;
`;

export const MyPageWrap = styled.div`
  background: #fff;
  width: 100%;
  border: 1px solid #adadad;
  border-radius: 29px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 630px;
`;

export const ChatListContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px;
`;

export const MessageItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isMyMessage"].includes(prop),
})<MessageItemProps>`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  margin: 5px 0;
  background-color: ${(props) => (props.isMyMessage ? "#6EC0F9" : "#E7E7E7")};
  align-self: ${(props) => (props.isMyMessage ? "flex-end" : "flex-start")};
  max-width: 100%;
  word-wrap: break-word;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: ${(props) => (props.isMyMessage ? "10px" : "0")};
`;

export const Timestamp = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isMyMessage"].includes(prop),
})<TimestampProps>`
  font-size: 10px;
  color: #666;
  margin-top: 5px;
  text-align: ${(props) => (props.isMyMessage ? "right" : "left")};
`;

export const MessageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isMyMessage"].includes(prop),
})<MessageWrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.isMyMessage ? "row-reverse" : "row")};
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

export const GoBackIcon = styled(FontAwesomeIcon)`
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #6ec0f9;
  }
  position: absolute;
  left: 40px;
  transform: translateY(-50%);
`;
export const UsersList = styled(FontAwesomeIcon)`
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #6ec0f9;
  }
  position: absolute;
  right: 40px;
  transform: translateY(-50%);
`;
export const EventName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  transform: translateY(-50%);
  flex-grow: 1;
  user-select: none;
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
