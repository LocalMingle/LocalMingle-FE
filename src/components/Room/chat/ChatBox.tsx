import * as ST from "./STChatBox";
import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import { EventDetailResponse } from "../ChatTypes";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { Modal } from "../../common/Modal";

type ChatBoxProps = {
  currentUserId: number;
  eventId: number;
  eventDetail: EventDetailResponse | null;
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
  const [participants, setParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUserNickname, currentUserProfileImg } = getCurrentUserDetails(
    props.eventDetail,
    props.currentUserId
  );
  const closeModal = () => {
    setIsModalOpen(false);
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
        userList: {
          [props.currentUserId]: {
            nickname: currentUserNickname,
            profileImg: currentUserProfileImg,
          },
        },
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
    if (socket) {
      socket.on("users_list", (usersList) => {
        setParticipants(usersList);
      });

      return () => {
        socket.off("users_list");
      };
    }
  }, [socket]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <ST.MessageContainer>
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
      <ST.ParticipantsButton onClick={openModal}>
        {t("참여자 목록 보기")}
      </ST.ParticipantsButton>
      {isModalOpen && (
        <Modal participants={participants} onClose={closeModal} />
      )}
      {error && <ST.ErrorMessage>{error}</ST.ErrorMessage>}
    </ST.MessageContainer>
  );
};
export default ChatBox;
