import React from 'react'
import * as St from './STCard'
import Tag from '../Tag/Tag'

const Card: React.FC = () => {
  return (
    <St.CardSection>
      <St.CardWrap>
        <St.CardTop>
          <Tag bgColor="green">카테고리명</Tag>
          <St.Members>07/10</St.Members>
        </St.CardTop>
        <St.Date>
          <span>모임 일시</span>
          <span>2023.12.25</span>
        </St.Date>
        <St.Title>6조 최종 프로젝트 파이팅 😆</St.Title>
        <St.CardMiddle>
          <Tag bgColor="orange">서울시 도봉구</Tag>
          <Tag bgColor="pink">아무나 환영</Tag>
        </St.CardMiddle>
        <St.CardBottom>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.8402 23.6793C20.5056 25.745 17.4102 26.9997 14.0002 26.9997C10.5901 26.9997 7.49476 25.745 5.16016 23.6793C5.29131 22.488 6.07826 21.3221 7.48164 20.4096C11.0753 18.1031 16.9512 18.1031 20.5187 20.4096C21.9221 21.3221 22.709 22.488 22.8402 23.6793Z" fill="#E7E7E7"/>
          <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.1715 16.5983C14.0717 16.584 13.9432 16.584 13.8291 16.5983C11.3179 16.5125 9.32031 14.4548 9.32031 11.9254C9.32031 9.33892 11.4035 7.23828 14.0003 7.23828C16.5829 7.23828 18.6803 9.33892 18.6803 11.9254C18.666 14.4548 16.6828 16.5125 14.1715 16.5983Z" fill="#E7E7E7"/>
        </svg>
        <St.NickName>닉네임</St.NickName>
        </St.CardBottom>
      </St.CardWrap>
    </St.CardSection>
  )
}

export default Card;