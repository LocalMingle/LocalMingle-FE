import React from "react";
import * as St from "./STUserListModal";
import { Button } from "../common/Button";
import { useLanguage } from "../../util/Locales/useLanguage";

type User = {
  userId: number;
  nickname: string;
  profileImg: string;
};

interface UserListModalProps {
  userList: User[];
  isOpen: boolean;
  onClose: () => void;
}

const UserListModal: React.FC<UserListModalProps> = ({
  userList,
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();

  return (
    <>
      {isOpen && (
        <>
          <St.ModalOverlay onClick={onClose}></St.ModalOverlay>{" "}
          <St.Modal>
            <St.ModalContent>
              <St.ModalHeader>
                <St.ModalTitle>{t("채팅 참가자")}</St.ModalTitle>
              </St.ModalHeader>
              <St.ModalBody>
                {userList.map((user, index) => (
                  <St.ModalList key={index}>
                    <St.ModalProfileImg>
                      <img src={user.profileImg} alt={user.nickname} />
                    </St.ModalProfileImg>
                    <St.ModalProfileInfo>
                      <div>
                        <p>{user.nickname}</p>
                      </div>
                    </St.ModalProfileInfo>
                  </St.ModalList>
                ))}
              </St.ModalBody>
              <St.ModalFooter>
                <Button onClick={onClose}>{t("닫기")}</Button>{" "}
              </St.ModalFooter>
            </St.ModalContent>
          </St.Modal>
        </>
      )}
    </>
  );
};

export default UserListModal;
