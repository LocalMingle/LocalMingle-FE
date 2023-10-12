import React from 'react'
import * as St from './STSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const Search: React.FC = () => {
  return (
    <St.SearchBar>
      <div>
        <St.SearchInput placeholder="제목 및 글 내용을 검색해 보세요."></St.SearchInput>
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{'color':'#646464'}}/>
      </div>
    </St.SearchBar>
  )
}

export default Search;