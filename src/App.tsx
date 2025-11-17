import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DonePage from "./pages/DonePage";
import GroupPage from "./pages/GroupPage";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import Sign1Page from "./pages/Sign1Page";
import Sign2Page from "./pages/Sign2Page";
import "./index.css";

import BottomNav from "./components/BottomNav";

export default function App() {
  const location = useLocation();
  const navPages = ["/Home", "/Group", "/My"];

  // [핵심 수정!]
  // .includes() 대신 .some()과 .startsWith()를 사용해
  // '/Home/' 처럼 끝에 '/'가 붙어도 'true'가 되도록 수정합니다.
  const showNav = navPages.some((path) => location.pathname.startsWith(path));

  // [복원!] 바깥 div는 Tailwind 클래스가 없는 게 맞습니다.
  // '#root'가 이미 회색 배경/가운데 정렬을 다 해주고 있습니다.
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* [복원!] .mobile-frame은 'relative'만 있으면 됩니다.
        (h-screen, overflow-hidden 다 틀린 거였습니다.)
      */}
      <div className="mobile-frame relative">
        {/* [복원!] <main> 태그는 'pb-16' 외에 다른 클래스가 필요 없습니다.
          (h-full, overflow-y-auto 다 틀린 거였습니다.)
          .mobile-frame의 'overflow:auto'가 스크롤을 담당합니다.
        */}
        <main className={showNav ? "pb-16" : ""}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/done" element={<DonePage />} />

            <Route path="/Group" element={<GroupPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/My" element={<MyPage />} />

            <Route path="/sign1" element={<Sign1Page />} />
            <Route path="/sign2" element={<Sign2Page />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </main>

        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
