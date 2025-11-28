// src/components/Calendar/CalendarScheduleModal.tsx

interface CalendarScheduleModalProps {
  open: boolean;
  date: Date | null;
  schedules?: { id: string; title: string }[];
  onClose: () => void;
}

export default function CalendarModal({
  open,
  date,
  schedules = [],
  onClose,
}: CalendarScheduleModalProps) {
  if (!open || !date) return null;

  const handleClose = () => onClose();

  const dateLabel = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  const hasSchedule = schedules.length > 0;

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
          {hasSchedule ? (
            <ul className="w-full flex flex-col gap-2">
              {schedules.map((s) => (
                <li
                  key={s.id}
                  className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded-[6px]"
                >
                  {s.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray4 text-center">일정이 없습니다.</p>
          )}
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
