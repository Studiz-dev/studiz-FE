import enter from "../assets/enter.svg";
import pen from "../assets/pen.svg";

interface FloatingActionMenuProps {
  open: boolean;
  onClose: () => void;
  onJoinGroup: () => void;
  onCreateGroup: () => void;
}

export default function ActionMenu({
  open,
  onClose,
  onJoinGroup,
  onCreateGroup,
}: FloatingActionMenuProps) {
  if (!open) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] h-[844px] bg-[#1A1A1A] opacity-[0.32] z-20"
        style={{ marginTop: "calc((100vh - 844px) / 2)" }}
        onClick={onClose}
      />

      {/* 동그란 플로팅 메뉴들 */}
      <div className="absolute bottom-28 right-4 z-20 flex flex-col items-end mb-[70px] gap-3">
        {/* 그룹 입장하기 */}
        <button
          onClick={onJoinGroup}
          className="flex items-center gap-3"
        >
          <span className="text-sm text-white drop-shadow">
            그룹 입장하기
          </span>
          <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center">
            <img src={enter} alt="enter" className="w-6 h-6" />
          </div>
        </button>

        {/* 그룹 만들기 */}
        <button
          onClick={onCreateGroup}
          className="flex items-center gap-2"
        >
          <span className="text-sm text-white drop-shadow">
            그룹 만들기
          </span>
          <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center">
          <img src={pen} alt="pen" className="w-5 h-5" />
          </div>
        </button>
      </div>
    </>
  );
}
