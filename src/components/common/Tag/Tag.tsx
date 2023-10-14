import React from 'react'
import * as St from './STTag'

interface TagProps {
  bgcolor?: string;
  children?: React.ReactNode;
}

const Tag:React.FC<TagProps> = ( {bgcolor, children}) => {
  return (
    <St.TagWrap>
      <St.Tag bgcolor={bgcolor}>{children}</St.Tag>
    </St.TagWrap>
  )
}

export default Tag;