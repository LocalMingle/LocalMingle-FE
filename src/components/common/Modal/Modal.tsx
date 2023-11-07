import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as St from "./STModal";
import { Button } from "../Button";
import { useRecoilState } from "recoil";
import { modalState } from "../../../recoil/atoms/ModalState";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { getEventDetail } from "../../../api/api";

interface ModalProps {}

interface ModalProps {
  participants: GuestUser[];
  onClose: () => void;
}

interface GuestUser {
  userDetailId: number;
  UserId: number;
  nickname: string;
  intro: string;
  profileImg: string;
  userLocation: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const Modal: React.FC<ModalProps> = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const { t } = useLanguage();
  const [guestUsers, setGuestUsers] = useState<GuestUser[]>([]);
  const [, setFetchedEventId] = useState<number | null>(null);

  const { eventId: routeEventId } = useParams<{ eventId?: string }>();
  const parsedEventId = parseInt(routeEventId ?? "0", 10);

  useEffect(() => {
    if (isModalOpen && parsedEventId) {
      const fetchEventDetail = async (eventId: number) => {
        try {
          const data = await getEventDetail(eventId);
          setGuestUsers(data.guestUser.flat() || []);
          setFetchedEventId(data.event.eventId);
        } catch (error) {
          console.error("참가자 정보 불러오기 실패:", error);
        }
      };
      fetchEventDetail(parsedEventId);
    }
  }, [isModalOpen, parsedEventId]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <>
          <St.ModalOverlay onClick={closeModal}></St.ModalOverlay>
          <St.Modal>
            <St.ModalContent>
              <St.ModalHeader>
                <St.ModalTitle>{t("참가자 리스트")}</St.ModalTitle>
              </St.ModalHeader>
              <St.ModalBody>
                {guestUsers.map((user, index) => (
                  <St.ModalList key={index}>
                    <St.ModalProfileImg>
                      <img src={user.profileImg} alt="프로필 이미지" />
                    </St.ModalProfileImg>
                    <St.ModalProfileInfo>
                      <div>
                        <p>{user.nickname}</p>
                        <span>{user.userLocation || "위치 정보 없음"}</span>
                      </div>
                      <div>{user.intro || "자기소개가 없습니다."}</div>
                    </St.ModalProfileInfo>
                  </St.ModalList>
                ))}
              </St.ModalBody>
              <St.ModalFooter>
                <Button onClick={closeModal}>{t("닫기")}</Button>
              </St.ModalFooter>
            </St.ModalContent>
          </St.Modal>
        </>
      )}
    </>
  );
};

export default Modal;
