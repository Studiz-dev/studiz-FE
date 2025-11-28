import { NavLink } from "react-router-dom";

import HomeIcon from "../assets/home.svg?react";
import GroupIcon from "../assets/group.svg?react";

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-10 bg-white h-16 border-t border-main4 border-b-[1.5px]">
      {/* 5. 아이콘 3개를 가로로, 간격을 벌려서 배치 */}
      <ul className="flex justify-around items-center h-full pb-[env(safe-area-inset-bottom)]">
        {/* "홈" 아이템 */}
        <li>
          <NavLink
            to="/Home" // 클릭 시 "/" 경로로 이동
            // 6. NavLink의 핵심 기능!
            // 현재 페이지가 이 경로(to="/")와 일치하면 isActive는 true가 됩니다.
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-point" : "text-main2" // 활성화/비활성화 색상
              }`
            }
          >
            {/* 7. SVG를 컴포넌트처럼 사용 */}
            <HomeIcon className="w-[30px] h-[30px]" />
            <span className="text-[14px] font-medium">홈</span>
          </NavLink>
        </li>

        {/* "그룹" 아이템 */}
        <li>
          <NavLink
            to="/Group" // 클릭 시 "/Group" 경로로 이동
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-point" : "text-main2"
              }`
            }
          >
            <GroupIcon className="w-[30px] h-[30px]" />
            <span className="text-[14px] font-medium">그룹</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
