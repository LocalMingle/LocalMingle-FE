import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 메시지 컨테이너
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
  margin-top: 90px;
`;

// 나의 메시지
export const MyMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0;

  & > div {
    margin-left: auto;
    max-width: 70%;
    padding: 10px 15px;
    background-color: #4caf50; // 초록색 배경
    color: white;
    border-radius: 15px 0px 15px 15px;
    word-wrap: break-word;
  }
`;

// 상대방의 메시지
export const OtherMessage = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 5px 0;

  & > div {
    max-width: 70%;
    padding: 10px 15px;
    background-color: #ffffff; // 흰색 배경
    color: #333333; // 글자색을 검정으로
    border: 1px solid #e0e0e0; // 테두리 추가
    border-radius: 0px 15px 15px 15px;
    word-wrap: break-word;
  }
`;

// 메시지 입력 부분
export const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
`;

export const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  height: 40px;
`;

export const SendButton = styled.button`
  background-color: #f7d16f; // 노란색
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  color: black;
`;

export const ErrorMessage = styled.div`
  color: #da7969;
  margin: 5px 0;
  text-align: center;
  font-weight: bold;
`;

export const ParticipantsButton = styled.button`
  background-color: #e7f3ff; // 연한 파란색 배경
  border: 2px solid #90cdf4; // 파란색 테두리
  border-radius: 20px; // 둥근 모서리
  padding: 8px 16px; // 안쪽 여백
  margin-top: 10px; // 위 여백
  color: #007bff; // 진한 파란색 글자
  font-size: 14px; // 글자 크기
  cursor: pointer; // 커서 포인터 모양
  display: flex; // Flexbox 레이아웃
  align-items: center; // 가로축 중앙 정렬
  justify-content: center; // 세로축 중앙 정렬
  gap: 10px; // 아이콘과 텍스트 사이 간격
  font-weight: 500; // 글자 굵기
  transition: background-color 0.3s ease; // 배경색 변경 애니메이션

  &:hover {
    background-color: #d0e9ff; // 호버시 배경색 변경
  }

  & .icon {
    font-size: 1.2em; // 아이콘 크기 조정
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-top: -20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #646464;
  cursor: pointer;

  &:hover {
    color: #6ec0f9;
  }
`;
