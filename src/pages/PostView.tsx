import React from "react";
import Header from "../components/common/Header/Header";
import { ViewPost } from "../components/PostPage/ViewPost";
import { Modal } from "../components/common/Modal";

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
