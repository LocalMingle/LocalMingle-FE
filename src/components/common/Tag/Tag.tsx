import React from 'react'
import * as St from './STTag'

interface TagProps {
  bgColor?: string;
  children?: React.ReactNode;
}

const Tag:React.FC<TagProps> = ( {bgColor, children}) => {
  return (
    <St.TagWrap>
      <St.Tag bgColor={bgColor}>{children}</St.Tag>
    </St.TagWrap>
  )
}

export default Tag;