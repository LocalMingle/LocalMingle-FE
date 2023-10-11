import React from 'react'
import * as St from './STBanner'

const Banner: React.FC = () => {
  return (
    <St.BannerSection>
      <St.BannerContent>
        <h3>동네 사람들과 같은 취미 공유!</h3>
        <p>지금 다양한 사람들과 함께 소모임을 즐겨 보세요</p>
      </St.BannerContent>
    </St.BannerSection>
  )
}

export default Banner;