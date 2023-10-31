import styled from "styled-components";

// 메시지 컨테이너
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

// 나의 메시지
export const MyMessage = styled.div`
  background-color: #4caf50; // 초록색
  padding: 10px;
  border-radius: 10px;
  align-self: flex-end;
  margin: 5px 0;
  max-width: 70%;
`;

// 상대방의 메시지
export const OtherMessage = styled.div`
  background-color: #e0e0e0; // 회색
  padding: 10px;
  border-radius: 10px;
  align-self: flex-start;
  margin: 5px 0;
  max-width: 70%;
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
`;

export const SendButton = styled.button`
  background-color: #f7d16f; // 노란색
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
`;

export const ErrorMessage = styled.div`
  color: #da7969;
  margin: 5px 0;
  text-align: center;
  font-weight: bold;
`;
