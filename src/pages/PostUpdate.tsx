import React from "react";
import Header from "../components/common/Header/Header";
import { UpdatePost } from "../components/PostPage/UpdatePost";

const PostModify: React.FC = () => {
  return (
    <>
      <Header></Header>
      <UpdatePost></UpdatePost>
    </>
  );
};

export default PostModify;
