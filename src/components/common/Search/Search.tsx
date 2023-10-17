import React from 'react'
import * as St from './STSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

interface SearchProps {
  onSearch: (keyword: string) => void;
}

const Search: React.FC = ( {onSearch} ) => {
  const [keyword, setKeyword] = React.useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  }

  return (
    <St.SearchBar>
      <div>
        <St.SearchInput placeholder="제목 및 글 내용을 검색해 보세요."></St.SearchInput>
        <FontAwesomeIcon onClick={onSearch} icon={faMagnifyingGlass} style={{'color':'#646464'}}/>
      </div>
    </St.SearchBar>
  )
}

export default Search;