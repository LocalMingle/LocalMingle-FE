import React, { useState, useEffect, useRef } from "react";
import * as St from "./STDeleteUser";
import { deleteUser } from "../../../api/api"; // <-- 이 부분 수정됨
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";

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
    <>
      <div>
        <div>
          <label>
            비밀번호 확인:
            <St.Input
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
            <St.TextArea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="왜 탈퇴하시는지 알려주세요ㅠㅠ으엉엉"
            />
          </label>
        </div>
        <div>
          <button onClick={handleDelete}>회원탈퇴</button>
        </div>
        <St.AnimationContainer ref={lottieContainer}></St.AnimationContainer>
      </div>
    </>
  );
};

export default DeleteUser;
