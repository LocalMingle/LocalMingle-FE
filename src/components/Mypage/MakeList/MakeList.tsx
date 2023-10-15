import React from "react";
import { useMutation } from "react-query";
import { deletePost } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { UpdateIcon, DeleteIcon } from "../../../asset/icon/Icon";
import * as ST from "./STMakeList";

interface Props {
  eventId?: number;
  refetch?: () => void;
}

const MakeList: React.FC<Props> = ({ eventId, refetch }) => {
  const navigate = useNavigate();

  const deletePostMutation = useMutation(
    () => {
      if (eventId) {
        return deletePost(String(eventId));
      } else {
        return Promise.reject(new Error("eventId is missing"));
      }
    },
    {
      onSuccess: () => {
        if (refetch) {
          refetch();
        }
      },
    }
  );

  const handlePostClick = () => {
    navigate(`/postview`);
  };

  const handleUpdateClick = () => {
    navigate(`/post/update/${eventId}`);
  };

  return (
    <ST.UserPostForm>
      <label onClick={handlePostClick}>
        글제목이 길면...표시가 될까요?? test!!
      </label>
      <div>
        <button onClick={handleUpdateClick}>
          <UpdateIcon />
        </button>
        <button onClick={() => deletePostMutation.mutate()}>
          <DeleteIcon />
        </button>
      </div>
    </ST.UserPostForm>
  );
};

export default MakeList;
