import styled from "styled-components";

// 메시지 컨테이너
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

// 나의 메시지
export const MyMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0;

  & > div {
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
