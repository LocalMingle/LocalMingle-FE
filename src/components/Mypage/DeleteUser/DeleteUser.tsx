import React, { useState, useEffect, useRef } from "react";
import * as St from "./STDeleteUser";
import { deleteUser } from "../../../api/api";
import lottie from "lottie-web";

const DeleteUser: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const lottieContainer = useRef(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  useEffect(() => {
    const handleRealDelete = async () => {
      try {
        const response = await deleteUser(password);
        console.log("회원탈퇴 성공!", response);
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
        animation.destroy(); // 2초 후 애니메이션 제거
        handleRealDelete(); // 실제 회원탈퇴 처리
      }, 2000);

      return () => animation.destroy(); // 컴포넌트 언마운트 시 애니메이션 제거
    }
  }, [showAnimation, password]);

  const handleDelete = () => {
    setShowAnimation(true); // 애니메이션을 보여주기 시작
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
        <div ref={lottieContainer}></div>
      </div>
    </>
  );
};

export default DeleteUser;
