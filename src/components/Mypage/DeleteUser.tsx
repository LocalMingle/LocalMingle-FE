import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/UserState";

const DeleteUser: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const userData = useRecoilValue(userState);

  const handleDelete = async () => {
    console.log("userId:", userData.userId);
    console.log("password:", password);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_URL}users/withdrawal`,
        {
          data: {
            userId: userData.userId,
            password,
          },
        }
      );
      console.log("회원탈퇴 성공!", response);
    } catch (error) {
      console.log("회원탈퇴 실패! 왜인지 알아보자", error);
      console.log(userData.userId, password);
    }
  };

  return (
    <>
      <div>
        <div>
          <label>
            비밀번호 확인:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요."
            />
          </label>
        </div>
        <div>
          <label>
            탈퇴 사유:
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="왜 탈퇴하시는지 알려주세요ㅠㅠ으엉엉"
            />
          </label>
        </div>
        <div>
          <button onClick={handleDelete}>회원탈퇴</button>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
