import type { DailySchedule } from "../../types/calender";

interface CalendarModalProps {
  open: boolean;
  date: Date | null;
  schedules: DailySchedule[]; // Updated to DailySchedule[]
  loading: boolean; // Added loading prop
  error: string | null; // Added error prop
  onClose: () => void;
}

export default function CalendarModal({
  open,
  date,
  schedules = [],
  loading,
  error,
  onClose,
}: CalendarModalProps) {
  if (!open) return null; // Only check 'open', allow date to be null for initial render safety

  const handleClose = () => {
    onClose();
  };

  const dateLabel = date ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일` : '';

  let content;

  if (loading) {
    content = <p className="text-sm text-gray4 text-center">일정 로딩 중...</p>;
  } else if (error) {
    content = <p className="text-sm text-red-500 text-center">{error}</p>;
  } else if (schedules.length === 0) {
    content = <p className="text-sm text-gray4 text-center">일정이 없습니다.</p>;
  } else {
    content = (
      <ul className="w-full flex flex-col gap-2">
        {schedules.map((s, index) => {
          // Extract HH:mm from "YYYY M DD HH:mm"
          const timeMatch = s.scheduleTime ? s.scheduleTime.match(/(\d{1,2}:\d{2})/) : null;
          const displayTime = timeMatch ? timeMatch[1] : '';

          return (
            <li
              key={`${s.title}-${index}`} // Use a combination for key as no unique ID for schedule item
              className="flex items-center justify-between text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded-[6px]"
            >
              <span className="text-left text-point w-1/4">{displayTime}</span>
              <span className="text-center flex-1 truncate">{s.title}</span>
              <span className="w-1/4"></span> {/* Placeholder for alignment */}
            </li>
          );
        })}
      </ul>
    );
  }


  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(26, 26, 26, 0.32)" }}
        onClick={handleClose}
      />

      {/* 모달 */}
      <div
        className="fixed left-1/2 top-1/2 z-50 w-[260px] min-h-[150px] -translate-x-1/2 -translate-y-1/2
                   rounded-[8px] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.16)] flex flex-col"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-3 w-full">
          <div className="w-6" />
          <h2 className="flex-1 text-center text-sm font-semibold">
            {dateLabel}
          </h2>
          <div className="w-6" />
        </div>

        {/* 내용 */}
        <div className="flex flex-col items-center justify-center gap-2 flex-1">
          {content}
        </div>

        {/* 확인 버튼 */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="w-[220px] h-[36px] rounded-[8px] text-white text-sm font-semibold transition
                       bg-point hover:bg-[#4C6953] cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </>
  );
}
