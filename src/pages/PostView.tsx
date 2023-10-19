import React from "react";
import Header from "../components/common/Header/Header";
import { ViewPost } from "../components/PostPage/ViewPost";

const PostView: React.FC = () => {
  return (
    <>
      <Header></Header>
      <ViewPost></ViewPost>
    </>
  );
};

export default PostView;
