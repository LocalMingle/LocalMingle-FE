import React from "react";
import * as St from "./STModal";
import { Button } from "../Button";
import { useRecoilState } from "recoil";
import { modalState } from "../../../recoil/atoms/ModalState";
import { useLanguage } from "../../../util/Locales/useLanguage";

const Modal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const { t } = useLanguage();

  // 모달창 닫기
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
                {/* 231022 JSY ModalList에 map 함수로 감싸기 */}
                <St.ModalList>
                  <St.ModalProfileImg>
                    {/* 231022 JSY 임시로 svg 이미지로 대체 */}
                    {/* <img src="" alt="프로필이미지" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="59"
                      height="59"
                      viewBox="0 0 59 59"
                      fill="none"
                    >
                      <path
                        d="M29.5 58C45.2401 58 58 45.2401 58 29.5C58 13.7599 45.2401 1 29.5 1C13.7599 1 1 13.7599 1 29.5C1 45.2401 13.7599 58 29.5 58Z"
                        fill="white"
                      />
                      <path
                        d="M48.8791 50.7204C43.761 55.2492 36.9751 57.9998 29.4991 57.9998C22.0232 57.9998 15.2373 55.2492 10.1191 50.7204C10.4067 48.1088 12.1319 45.5527 15.2085 43.5522C23.0871 38.4956 35.9687 38.4956 43.7897 43.5522C46.8664 45.5527 48.5916 48.1088 48.8791 50.7204Z"
                        fill="#E7E7E7"
                      />
                      <path
                        d="M29.5 58C45.2401 58 58 45.2401 58 29.5C58 13.7599 45.2401 1 29.5 1C13.7599 1 1 13.7599 1 29.5C1 45.2401 13.7599 58 29.5 58Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M29.8756 35.1997C29.6566 35.1684 29.3751 35.1684 29.1249 35.1997C23.6195 35.0117 19.2402 30.5004 19.2402 24.9554C19.2402 19.2849 23.8072 14.6797 29.5002 14.6797C35.162 14.6797 39.7602 19.2849 39.7602 24.9554C39.729 30.5004 35.381 35.0117 29.8756 35.1997Z"
                        fill="#E7E7E7"
                      />
                    </svg>
                  </St.ModalProfileImg>
                  <St.ModalProfileInfo>
                    <div>
                      <p>닉네임</p>
                      <span>부산광역시</span>
                    </div>
                    <div>자기소개란 입니다.</div>
                  </St.ModalProfileInfo>
                </St.ModalList>
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
