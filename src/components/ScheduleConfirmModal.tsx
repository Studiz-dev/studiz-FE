interface ScheduleConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  location: string;
  studyName: string;
  date: string;
  time: string;
}

export default function ScheduleConfirmModal({
  open,
  onClose,
  onConfirm,
  location,
  studyName,
  date,
  time,
}: ScheduleConfirmModalProps) {
  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-50"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-32px)] max-w-[320px] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] px-6 py-6">
        {/* 제목 */}
        <h2 className="text-lg font-bold text-black1 text-center mb-3">
          일정 확정하기
        </h2>

        {/* 위치 */}
        <div className="text-sm font-medium text-point text-center mb-2">
          {location}
        </div>

        {/* 스터디 이름 */}
        <div className="text-base font-bold text-black1 text-center mb-3">
          {studyName}
        </div>

        {/* 날짜/시간 */}
        <div className="text-sm font-medium text-black1 text-center mb-6">
          {date} {time}
        </div>

        {/* 질문 */}
        <p className="text-sm font-medium text-black1 text-center mb-6">
          일정을 확정하시겠습니까?
        </p>

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full h-12 rounded-lg bg-point text-white text-base font-semibold hover:bg-[#4C6953] transition"
        >
          확인
        </button>
      </div>
    </>
  );
}

