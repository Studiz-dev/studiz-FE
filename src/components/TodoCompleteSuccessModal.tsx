interface TodoCompleteSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TodoCompleteSuccessModal({
  open,
  onClose,
}: TodoCompleteSuccessModalProps) {
  if (!open) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-50"
        onClick={onClose}
      />

      {/* 성공 모달 */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-32px)] max-w-[320px] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] px-6 py-6">
        {/* 제목 */}
        <h2 className="text-lg font-bold text-black1 text-center mb-4">
          To-Do 완료하기
        </h2>

        {/* 메시지 */}
        <p className="text-sm font-medium text-gray4 text-center mb-6">
          TO-DO가 성공적으로 완료되었습니다.
        </p>

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="w-full h-12 rounded-lg bg-point text-white text-base font-semibold hover:bg-[#4C6953] transition"
        >
          확인
        </button>
      </div>
    </>
  );
}

