import styled from "styled-components";

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;

  & img:first-child {
    width: 160px;
    cursor: pointer;
  }

  & img:last-child {
    width: 210px;
    cursor: pointer;
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;

  label {
    color: #646464;
    font-size: 15px;
    margin-bottom: 8px;
  }
`;

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

export const ClearIcon = styled.span`
  position: absolute;
  right: 16px;
  top: 45%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  min-width: 300px;
  border-radius: 5px;
  border: 1px solid #e7e7e7;
  margin-bottom: 10px;
  background: #fff;
`;

export const SignupText = styled.div`
  margin-top: 30px;
  font-size: 14px;
  user-select: none;
  color: #adadad;

  span {
    color: #da7969;
    cursor: pointer;
    text-decoration: none;
  }
`;

export const ErrorMessageLogin = styled.div`
  font-size: 12px;
  color: #da7969;
  width: 100%;
`;

export const Divider = styled.div`
  margin-top: 65px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const Line = styled.div`
  width: 80px;
  height: 1px;
  background: #E7E7E7;
  margin: 0px;
`;

export const Text = styled.span`
  color: #ADADAD;
  margin: 0 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 15px;
`;

// 카카오 로그인 버튼
export const KakaoLoginBtn = styled.img`
  width: 55px;
  height: 55px;
  cursor: pointer;
`;

// 구글 로그인 버튼
export const GoogleLoginBtn = styled.img`
  width: 55px;
  height: 55px;
  cursor: pointer;
`;

// 네이버 버튼
export const NaverLoginBtn = styled.img`
  width: 55px;
  height: 55px;
  cursor: pointer;
`;

// 언어선택 버튼
export const Language = styled.div`
  position: absolute;
  top: 25px;
  right: 20px;

  & button {
    border: none;
    background-color: transparent;
  }
  & img {
    display: block;
    width: 35px;
    cursor: pointer;
  }
`
