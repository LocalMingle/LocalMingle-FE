import React from 'react'
import * as St from './STFixedButton'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencil} from '@fortawesome/free-solid-svg-icons'

const FixedButton:React.FC = () => {
  const navigate = useNavigate();

  // 게시글 작성 페이지로 이동
  const goToPost = (): void => {
    navigate('/post');
  }

  return (
    <St.FixedBtnWrap onClick={goToPost}>
      <St.FixedBtn>
        <FontAwesomeIcon icon={faPencil} style={{'color':'#fff','fontSize':'28px'}}/>
      </St.FixedBtn>
    </St.FixedBtnWrap>
  )
}

export default FixedButton;