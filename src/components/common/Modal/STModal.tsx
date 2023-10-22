import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
`

export const Modal = styled.div`
  border-radius: 32px;
  border: 1px solid #E7E7E7;
  background: #FFF;
  padding: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 330px;
  z-index: 2;
  min-height: 680px;
`

export const ModalContent = styled.div`
  border-radius: 28px;
  border: 1px solid #ADADAD;
  background: #FFF;
  min-height: 680px;
`

export const ModalHeader = styled.div`
  text-align: center;
  margin: 25px 0;
`

export const ModalTitle = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 700;
`

export const ModalBody = styled.div`
  margin-bottom: 20px;
  padding: 0 20px;
  overflow-y: auto;
  height: 520px;
`

export const ModalList = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #E7E7E7;
  display: flex;
  align-items: center;
`

export const ModalProfileImg = styled.div`
  margin-right: 12px;
  /* 231022 JSY */
  /* 아래는 실제 유저 프로필 이미지 (img 태그)에 대한 css로 주석 해제하여 사용 */
  /* & img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #292D32;
  } */
`

export const ModalProfileInfo = styled.div`
  display: flex;
  flex-direction: column;

  & div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  & div p {
    display: inline-block;
    color: #646464;
    font-size: 17px;
    padding-right: 5px;
  }

  & div span {
    color: #ADADAD;
    font-size: 12px;
  }

  & div:last-child {
    color: #000;
    font-size: 12px;
  }
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`
