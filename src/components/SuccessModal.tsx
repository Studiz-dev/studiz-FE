// src/components/SuccessModal.tsx
import type { ReactNode } from "react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  message1: string | ReactNode;
  message2: string;
  title?: string;
}

export default function SuccessModal({
  open,
  onClose,
  message1,
  message2,
  title = "그룹 만들기",
}: SuccessModalProps) {
  if (!open) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] h-[844px] z-50"
        style={{
          marginTop: "calc((100vh - 844px) / 2)",
          backgroundColor: "rgba(26, 26, 26, 0.32)",
        }}
        onClick={handleClose}
      />

      {/* 성공 모달 */}
      <div
        className="fixed left-1/2 z-50 w-[232px] h-[144px] -translate-x-1/2
                   rounded-[8px] bg-white px-3 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)] flex flex-col"
        style={{
          marginTop: "calc((100vh - 844px) / 2 + (844px - 144px) / 2)",
        }}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-3 w-full">
          <div className="w-6" /> {/* 좌측 더미로 제목 가운데 정렬 */}
          <h2 className="flex-1 text-center text-sm font-semibold">
            {title}
          </h2>
          <div className="w-6" /> {/* 우측 더미로 제목 가운데 정렬 */}
        </div>

        {/* 메시지 */}
        <div className="flex flex-col items-center justify-center mb-2">
          <p className="text-sm font-medium text-gray4 text-center">
            {message1}
          </p>
          <p className="text-sm font-medium text-gray4 text-center">
            {message2}
          </p>
        </div>

        {/* 확인 버튼 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleClose}
            className="w-[208px] h-[36px] rounded-[8px] text-white text-sm font-semibold transition
                       bg-point hover:bg-[#4C6953] cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}

