import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Category = styled.span`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

export const EventName = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 10px;
`;

export const Nickname = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

export const CreatedAt = styled.div`
  font-size: 14px;
  color: #888;
`;

export const EventDate = styled.div`
  font-size: 16px;
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const SignupDate = styled.div`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

export const EventLocation = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const MaxSize = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
`;

export const Content = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const PostInfo = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #ffd700;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #ffc300;
  }
`;

export const ChatButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px solid #ffd700;
  background-color: transparent;
  color: #ffd700;
  cursor: pointer;
  &:hover {
    background-color: #ffd700;
    color: #fff;
  }
`;

export const GuestUserContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GuestProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px; // 혹은 원하는 간격을 설정해줘!
`;

export const MoreUsers = styled.div`
  font-size: 20px; // 원하는 폰트 크기로 설정해줘!
`;
