import React, { useState } from "react";
// import { useRecoilState } from "recoil";
// import { userState } from "../recoil/atoms/UserState";

const SignUpForm: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");

  // const [user, setUser] = useRecoilState(userState);

  const handleEmailVerification = () => {
    // 이메일 인증 로직을 구현
    // 이메일을 보내고, 인증 코드를 확인하는 등의 작업을 수행
  };

  const handleSignUp = () => {
    // 회원가입 로직을 구현
    // 입력된 정보를 서버로 전송하고 회원가입을 처리
    // 이메일 인증이 완료되었는지 확인하고 처리
    // 회원가입이 성공하면 Recoil 상태를 업데이트
    // setUser({ userId: });
  };

  return (
    <div>
      <label>
        닉네임:
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </label>
      <br />
      <label>
        이메일:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleEmailVerification}>이메일 인증</button>
      </label>
      <br />
      <label>
        비밀번호:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        비밀번호 확인:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        한줄 자기 소개:
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

export default SignUpForm;
