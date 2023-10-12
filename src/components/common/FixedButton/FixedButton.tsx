import React from 'react'
import * as St from './STFixedButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencil} from '@fortawesome/free-solid-svg-icons'

const FixedButton:React.FC = () => {
  return (
    <St.FixedBtnWrap>
      <St.FixedBtn>
        <FontAwesomeIcon icon={faPencil} style={{'color':'#fff','fontSize':'28px'}}/>
      </St.FixedBtn>
    </St.FixedBtnWrap>
  )
}

export default FixedButton;