import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DonePage from "./pages/DonePage";
import GroupPage from "./pages/GroupPage";
import HomePage from "./pages/HomePage";
import Sign1Page from "./pages/Sign1Page";
import Sign2Page from "./pages/Sign2Page";
import MemberPage from "./pages/MemberPage";
import "./index.css";

import BottomNav from "./components/BottomNav";

export default function App() {
  const location = useLocation();
  const navPages = ["/Home", "/Group", "/My"];

  // [핵심 수정!]
  // .includes() 대신 .some()과 .startsWith()를 사용해
  // '/Home/' 처럼 끝에 '/'가 붙어도 'true'가 되도록 수정합니다.
  // 대소문자 무시하도록 toLowerCase() 추가
  const showNav = navPages.some(
    (path) => location.pathname.toLowerCase().startsWith(path.toLowerCase())
  );

  return (
    <div className="w-full h-full md:flex md:justify-center md:items-center md:min-h-screen bg-gray-100">
      {/* 모바일 프레임 - 반응형으로 작동 */}
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

            <Route path="/sign1" element={<Sign1Page />} />
            <Route path="/sign2" element={<Sign2Page />} />

            <Route path="/Member" element={<MemberPage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </main>

        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
