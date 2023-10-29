import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Post from "../pages/Post";
import MyPage from "../pages/MyPage";
import PostView from "../pages/PostView";
import PostUpdate from "../pages/PostUpdate";
import UserInfo from "../components/Mypage/UserInfo/UserInfo";
import MakeList from "../components/Mypage/MakeList/MakeList";
import JoinList from "../components/Mypage/JoinList/JoinList";
import DeleteUser from "../components/Mypage/DeleteUser/DeleteUser";

// BrowserRouter
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<Main />}></Route>

        {/* 회원가입 페이지 */}
        <Route path="/join" element={<Join />} />
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 게시글 작성 페이지 */}
        <Route path="/post" element={<Post />} />
        {/* 게시글 상세보기 페이지 */}
        <Route path="/postview/:eventId" element={<PostView />} />
        {/* 게시글 수정 페이지 */}
        <Route path="/post/update/:eventId" element={<PostUpdate />} />

        {/* 마이페이지 - 내 프로필, 생성목록, 참가목록, 회원탈퇴 */}
        <Route path="/mypage" element={<MyPage />}>
          <Route index element={<UserInfo />} />
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="makelist" element={<MakeList />} />
          <Route path="joinlist" element={<JoinList />} />
          <Route path="deleteuser" element={<DeleteUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
