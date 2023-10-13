import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Post from "../pages/Post";
import MyPage from "../pages/MyPage";
import PostView from "../pages/PostView";
import UserInfo from "../components/Mypage/UserInfo";
import MakeList from "../components/Mypage/MakeList";
import JoinList from "../components/Mypage/JoinList";
import DeleteUser from "../components/Mypage/DeleteUser";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/postview" element={<PostView />} />
        <Route path="/mypage/userinfo" element={<UserInfo />} />
        <Route path="/mypage/makelist" element={<MakeList />} />
        <Route path="/mypage/joinlist" element={<JoinList />} />
        <Route path="/mypage/deleteuser" element={<DeleteUser />} />
      </Routes>
    </BrowserRouter>
  );
}
