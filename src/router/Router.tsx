import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Post from "../pages/Post";
import MyPage from "../pages/MyPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<Post />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
