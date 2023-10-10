import React from 'react'
import { useNavigate } from 'react-router-dom'
import {HeaderWrap} from './STHeader'

const Header: React.FC = () =>{
  const navigate = useNavigate();
  
  // 로그인 여부
  const isLogin = false;

  // (로고)메인 페이지로 이동 
  const goToMain = () => {
    navigate('/');
  }

  // 게시글 작성 페이지로 이동
  const goToPost = () => {
    navigate('/post');
  }

  // 마이 페이지로 이동
  const goToMyPage = () => {
    navigate('/mypage');
  }

  // 로그인 페이지로 이동
  const login = () => {
    navigate('/login');
  }

  // 로그아웃 : 토큰 삭제
  const logout = () => {
    alert('로그아웃 버튼을 눌렀습니다');
  }

  return (
    <>
    {isLogin === false ? (
      /* 로그인 전 */
      <HeaderWrap>
          <span onClick={goToMain}>로고</span>
          {/* 231010 JSY : 이미지 로고 받으면 아래 코드로 교체 예정 */}
          {/* <img src="" alt="logo" onClick={goToMain}>로고</img> */}
        <button onClick={login}>로그인</button>
      </HeaderWrap>
    ) : (
      /* 로그인 후 */
      <HeaderWrap>
          <span onClick={goToMain}>로고</span>
          {/* 231010 JSY : 이미지 로고 받으면 아래 코드로 교체 예정 */}
          {/* <img src="" alt="logo" onClick={goToMain}>로고</img> */}
          <div>
            <button onClick={goToPost}>게시글 작성</button>
            <button onClick={goToMyPage}>마이 페이지</button>
            <button onClick={logout}>로그아웃</button>
          </div>
      </HeaderWrap>
    )}
    </>
  )
};

export default Header