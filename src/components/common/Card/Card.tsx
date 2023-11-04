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
    location_City: string;
    location_District: string;
    eventName: string;
    isDeleted: boolean;
    isVerified: string;
    maxSize: number;
    signupEndDate: string;
    signupStartDate: string;
    updatedAt: string;
  };
  guestList: number;
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

const setDefaultMember = (member: number): number => {
  // 최소 맴버수(본인 포함) +1
  return member + 1;
}

const Card: React.FC<CardProps> = ({ event, guestList, hostUser }) => {
  const { t } = useLanguage();
  return (
    <St.CardSection>
      <St.CardWrap>
        <St.CardTop>
          <Tag bgcolor="green">{t(event.category)}</Tag>
          <St.Members>
            {setDefaultMember(guestList)} / {event.maxSize}
          </St.Members>
        </St.CardTop>
        <St.Date>
          <span>{t("모임일시")}</span>
          <span>{setDateFormat(event.eventDate)}</span>
        </St.Date>
        <St.Title>{event.eventName}</St.Title>
        <St.CardMiddle>
          {/* 시/도 - 구/군 / 카테고리 */}
          <Tag bgcolor="orange">{t(event.location_City)}</Tag>
          <Tag bgcolor="pink">{t(event.location_District)}</Tag>
          <Tag bgcolor="blue">{t(event.isVerified)}</Tag>
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
