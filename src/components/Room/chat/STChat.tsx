import styled from "styled-components";

export const NewUser = styled.div``;

export const Metadata = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const Time = styled.div`
  color: var(--gray-05);
  font-size: 12px;
  margin-left: auto;
`;

export const Message = styled.div`
  font-size: 15px;
  word-wrap: break-word;
  width: 100%;
  color: white;
`;

export const UserName = styled.div`
  color: #9e9e9e;
  font-size: 15px;
`;

export const ChatDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;

  width: 100%;
`;

export const UserImg = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 50%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 8px;

  width: 100%;
`;
