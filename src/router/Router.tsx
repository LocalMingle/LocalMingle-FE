import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../pages/Join";
import Login from "../pages/Login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
