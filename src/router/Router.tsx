import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../pages/Join";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}
