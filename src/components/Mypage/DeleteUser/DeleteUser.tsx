import React, { useState, useEffect, useRef } from "react";
import * as St from "./STDeleteUser";
import { deleteUser } from "../../../api/api"; // <-- 이 부분 수정됨
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/Button";

const DeleteUser: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const lottieContainer = useRef(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRealDelete = async () => {
      try {
        const response = await deleteUser(password);
        console.log("회원탈퇴 성공!", response);
        navigate("/login");
      } catch (error) {
        console.log("회원탈퇴 실패! 왜인지 알아보자", error);
      }
    };

    if (lottieContainer.current && showAnimation) {
      const animation = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/animations/goodbye-animation.json",
      });

      setTimeout(() => {
        animation.destroy();
        handleRealDelete();
      }, 3000);

      return () => animation.destroy();
    }
  }, [showAnimation, password, navigate]);

  const handleDelete = () => {
    setShowAnimation(true);
  };

  return (
    <St.DeleteUserContainer>
      <St.DeleteUserWrap>
        <p>비밀번호 재입력</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </St.DeleteUserWrap>
      <St.DeleteUserWrap>
        <div>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="
  탈퇴하는 사유를 입력해주세요 🙂

  소중한 피드백은 더 좋은 서비스를 제공하기 위해
  적극적으로 반영하도록 하겠습니다!"
          />
        </div>
      </St.DeleteUserWrap>
      <Button onClick={handleDelete}>탈퇴하기</Button>
      {/* <St.AnimationContainer ref={lottieContainer}></St.AnimationContainer> */}
    </St.DeleteUserContainer>
  );
};

export default DeleteUser;
