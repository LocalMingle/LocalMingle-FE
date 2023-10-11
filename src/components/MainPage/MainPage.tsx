import React from 'react'
import Banner from '../common/ Banner/Banner'
import Search from '../common/Search/Search'
import Selector from '../common/Selector/Selector'

const MainPage: React.FC = () => {
  return (
    <>
      <Banner></Banner>
      <Search></Search>
      <Selector></Selector>
    </>
  )
}

export default MainPage