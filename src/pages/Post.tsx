import React from 'react'
import Header from '../components/common/Header/Header'
import { WritePost } from '../components/PostPage/WritePost'

const Post: React.FC = () => {
  return (
    <>
    <Header></Header>
    <WritePost></WritePost>
    </>
  )
}

export default Post