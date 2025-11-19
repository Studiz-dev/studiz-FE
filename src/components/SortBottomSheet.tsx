import { useState } from "react";
import type { SortOrder } from "../types/group";

interface SortBottomSheetProps {
  open: boolean;
  current: SortOrder;
  onClose: () => void;
  onApply: (order: SortOrder) => void;
}

export default function SortBottomSheet({
  open,
  current,
  onClose,
  onApply,
}: SortBottomSheetProps) {
  if (!open) return null;

  const [tempOrder, setTempOrder] = useState<SortOrder>(current);

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] h-[744px] bg-black bg-opacity-20 z-30"
        style={{ marginTop: "calc((100vh - 744px) / 2)" }}
        onClick={onClose}
      />

      {/* 바텀시트 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-40 px-6 pt-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        {/* 핸들 바 */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* 제목 */}
        <h2 className="text-lg font-semibold mb-5">정렬 기준</h2>

        {/* 정렬 옵션 버튼들 */}
        <div className="flex gap-3 mb-8">
          <button
            type="button"
            onClick={() => setTempOrder("최신순")}
            className={`px-4 h-10 rounded-full border text-sm font-medium
              ${
                tempOrder === "최신순"
                  ? "border-point text-point bg-white"
                  : "border-gray4 text-gray4bg-white"
              }`}
          >
            최신순
          </button>
          <button
            type="button"
            onClick={() => setTempOrder("오래된순")}
            className={`px-4 h-10 rounded-full border text-sm font-medium
              ${
                tempOrder === "오래된순"
                  ? "border-point text-point bg-white"
                  : "border-gray4 text-gray4 bg-white"
              }`}
          >
            오래된순
          </button>
        </div>

        {/* 적용하기 버튼 */}
        <button
          type="button"
          onClick={() => onApply(tempOrder)}
          className="w-full h-12 rounded-[8px] bg-point text-white font-semibold text-sm"
        >
          적용하기
        </button>
      </div>
    </>
  );
}
