import styled from "styled-components";

export const ViewSection = styled.div`
  margin-top: 30px;
`;

export const TitleWrap = styled.div`
  margin-bottom: 5px;

  & > div {
    display: flex;
    align-items: center;

    & > span {
      border-radius: 20px;
      border: 1px solid #ADADAD;
      background: #A4EEC6;
      padding: 6px 8px;
      font-size: 12px;
    }
  }
`;

export const Category = styled.span`
  font-size: 15px;
  color: #646464;
`;

export const EventName = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color: #131313;
  margin: 10px 0;
  line-height: 1.2;
`

export const Join = styled.div`
  & > h1 {
    font-weight: 700;
    font-size: 24px;
    color: #131313;
    margin: 10px 0;
    line-height: 1.2;
    width: 80%;
  }
`;

export const ProfileWrap = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-left: 15px;
  }
`

export const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #292D32;
  object-fit: cover;
`;

export const Nickname = styled.div`
  font-size: 17px;
  color: #646464;
  margin-bottom: 5px;
`;

export const CreatedAt = styled.div`
  font-size: 12px;
  color: #ADADAD;
`;

export const Infowrap = styled.div`
  margin: 20px 0;

  & p {
    color: #ADADAD;
    font-size: 15px;
    width: 110px;
  }

  & span {
    color: #131313;
    font-size: 15px;
  }
`
export const EventDate = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const SignupDate = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const EventLocation = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const MaxSize = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const ContentWrap = styled.div`
  border-radius: 26px;
  border: 1px solid #E7E7E7;
  background: #FFF;
  padding: 3px;
  min-height: 300px;
  margin-bottom: 30px;
`

export const Content = styled.p`
  border-radius: 23px;
  border: 1px solid #ADADAD;
  background: #FFF;
  font-size: 15px;
  line-height: 1.2;
  color: #131313;
  padding: 15px;
  min-height: 300px;
  overflow-y: auto;
`;

export const PostInfo = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`;

export const GuestUserContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GuestProfileImg = styled.img`
  width: 25px;
  height: 25px;
  border: 1px solid #292D32;
  border-radius: 50%;
  margin-right: 3px;
  object-fit: cover;
`;

export const ButtonWrap = styled.div`
  & div {
    display: flex;
    justify-content: center;
    gap: 30px;
  }
`

export const MoreUsers = styled.div`
  font-size: 20px;
  color: #ADADAD;
`;
