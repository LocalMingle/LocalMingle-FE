import React from "react";
import * as St from "./STCard";
import Tag from "../Tag/Tag";
import { useLanguage } from "../../../util/Locales/useLanguage";

// 카드 (Swagger 기준)
interface CardProps {
  event: {
    category: string;
    content: string;
    createdAt: string;
    eventDate: string;
    eventId: number;
    eventLocation: string;
    eventName: string;
    isDeleted: boolean;
    isVerified: string;
    maxSize: number;
    signupEndDate: string;
    signupStartDate: string;
    updatedAt: string;
  };
  guestList: number[];
  hostUser: [
    {
      userDetailId: number;
      UserId: number;
      nickname: string;
      intro: string;
      profileImg: string;
      updatedAt: string;
    }
  ];
}

const setDateFormat = (date: string): string => {
  // 날짜 형식 변경 2023-10-25
  return new String(date).split("T")[0];
};

const Card: React.FC<CardProps> = ({ event, guestList, hostUser }) => {
  const { t } = useLanguage();
  return (
    <St.CardSection>
      <St.CardWrap>
        <St.CardTop>
          <Tag bgcolor="green">{t(event.category)}</Tag>
          <St.Members>
            {" "}
            {guestList} / {event.maxSize}
          </St.Members>
        </St.CardTop>
        <St.Date>
          <span>{t("모임일시")}</span>
          <span>{setDateFormat(event.eventDate)}</span>
        </St.Date>
        <St.Title>{event.eventName}</St.Title>
        <St.CardMiddle>
          <Tag bgcolor="orange">{event.eventLocation}</Tag>
          <Tag bgcolor="pink">{t(event.isVerified)}</Tag>
        </St.CardMiddle>
        <St.CardBottom>
          <St.ProfileImg src={hostUser[0].profileImg} alt="profile" />
          <St.NickName>{hostUser[0].nickname}</St.NickName>
        </St.CardBottom>
      </St.CardWrap>
    </St.CardSection>
  );
};

export default Card;
