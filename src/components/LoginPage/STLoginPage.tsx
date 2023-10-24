import styled from "styled-components";

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
  margin-top: 20px;
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

export const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: #fefbf6;
  margin-top: 5px;

  img {
    border-radius: 12px;
  }
`;

// 구글 로그인 버튼
export const GoogleLoginButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: #9ca5b4;
  border-radius: 2px;
  border: none;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #357ae8;
  }
`;

export const Icon = styled.img`
  margin-right: 10px;
`;

// 네이버 버튼
export const NaverLoginBtn = styled.img`
  width: 50px;
  height: 50px;
`;
