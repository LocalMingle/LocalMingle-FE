import * as ST from "./STChatBox";
import { useRecoilState } from "recoil";
import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import { EventDetailResponse } from "../ChatTypes";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { modalState } from "../../../recoil/atoms/ModalState";
import UserListModal from "../UserListModal";

type ChatBoxProps = {
  currentUserId: number;
  eventId: number;
  eventDetail: EventDetailResponse | null;
};
type User = {
  userId: number;
  nickname: string;
  profileImg: string;
};
const getCurrentUserDetails = (
  eventDetail: EventDetailResponse | null,
  currentUserId: number
) => {
  let currentUserNickname;
  let currentUserProfileImg;

  if (eventDetail?.hostUser[0]?.UserId === currentUserId) {
    currentUserNickname = eventDetail?.hostUser[0]?.nickname;
    currentUserProfileImg = eventDetail?.hostUser[0]?.profileImg;
  } else {
    const currentUser = eventDetail?.guestUser.find((group) =>
      group.some((user) => user.UserId === currentUserId)
    );

    if (currentUser) {
      const guestUser = currentUser.find(
        (user) => user.UserId === currentUserId
      );

      if (guestUser) {
        currentUserNickname = guestUser.nickname;
        currentUserProfileImg = guestUser.profileImg;
      }
    }
  }
  return { currentUserNickname, currentUserProfileImg };
};

const ChatBox = (props: ChatBoxProps) => {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const [error, setError] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const { currentUserNickname, currentUserProfileImg } = getCurrentUserDetails(
    props.eventDetail,
    props.currentUserId
  );
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  // 중복을 제거하는 함수
  const getUniqueUserList = (users: User[]): User[] => {
    const uniqueUsers = {};
    users.forEach((user) => {
      uniqueUsers[user.userId] = user;
    });
    return Object.values(uniqueUsers);
  };
  const handleSendMessage = () => {
    if (!isComposing && message.trim() && socket) {
      const currentTime = new Date().toLocaleTimeString();
      const messageData = {
        userId: props.currentUserId,
        nickname: currentUserNickname,
        profileImg: currentUserProfileImg,
        time: currentTime,
        roomId: props.eventId,
        message: message,
      };
      socket.emit("submit_chat", messageData);
      setMessage("");
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on("error", (errorMessage: string) => {
        setError(errorMessage);
      });
      return () => {
        socket.off("error");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket && currentUserNickname && currentUserProfileImg) {
      const joinData = {
        roomId: props.eventId,
        userId: props.currentUserId,
        nickname: currentUserNickname,
        profileImg: currentUserProfileImg,
      };
      socket.emit("join_room", joinData);
    }
  }, [
    socket,
    currentUserNickname,
    currentUserProfileImg,
    props.currentUserId,
    props.eventId,
  ]);
  useEffect(() => {
    const handleUserListUpdate = (serverUserList: User[]) => {
      setUserList(getUniqueUserList(serverUserList));
    };

    if (socket) {
      socket.on("userList", handleUserListUpdate);
    }

    return () => {
      if (socket) {
        socket.off("userList", handleUserListUpdate);
      }
    };
  }, [socket]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <ST.MessageContainer>
        <ST.Icon icon={faBarsStaggered} onClick={toggleModal} />
        <ST.InputContainer>
          <ST.InputField
            type="text"
            value={message}
            onInput={(e) => setMessage((e.target as HTMLInputElement).value)}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e) => {
              if (!isComposing && e.key === "Enter" && !e.shiftKey) {
                handleSendMessage();
                e.preventDefault();
              }
            }}
            placeholder={t("내용을 입력하세요")}
            maxLength={200}
          />

          <ST.SendButton onClick={handleSendMessage}>{t("전송")}</ST.SendButton>
        </ST.InputContainer>
        {error && <ST.ErrorMessage>{error}</ST.ErrorMessage>}
      </ST.MessageContainer>
      <UserListModal
        userList={userList}
        isOpen={isModalOpen}
        onClose={toggleModal}
      />
    </>
  );
};
export default ChatBox;
