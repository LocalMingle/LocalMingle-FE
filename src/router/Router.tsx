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
import RedirectionPage from "../pages/RedirectionPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        {/* 작성자 본인 글 보기 */}
        <Route path="/postview/:eventId" element={<PostView />} /> 
        {/* 게시글 수정 */}
        <Route path="/post/update/:eventId" element={<PostUpdate />} /> 

        <Route path="/mypage" element={<MyPage />}>
          <Route index element={<UserInfo />} />
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="makelist" element={<MakeList />} />
          <Route path="joinlist" element={<JoinList />} />
          <Route path="deleteuser" element={<DeleteUser />} />
        </Route>
        <Route path="/users/login/kakao" element={<RedirectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
