import React from 'react'
import * as St from './STSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

const Spinner:React.FC = () => {
  return (
    <St.Spinner>
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    </St.Spinner>
  )
}

export default Spinner