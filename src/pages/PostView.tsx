import React from "react";
import { Modal } from "../components/common/Modal";
import Header from "../components/common/Header/Header";
import { ViewPost } from "../components/PostPage/ViewPost";

const PostView: React.FC = () => {
  return (
    <>
      <Header></Header>
      <ViewPost></ViewPost>
      <Modal></Modal>
    </>
  );
};

export default PostView;
