// src/components/JoinGroupModal.tsx
import { useState, useEffect } from "react";

interface JoinGroupModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
}

export default function JoinGroupModal({
  open,
  onClose,
  onSubmit,
}: JoinGroupModalProps) {
  const [code, setCode] = useState("");

  // 모달 열릴 때마다 폼 초기화
  useEffect(() => {
    if (open) {
      setCode("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (code.trim() === "") return;
    onSubmit(code.trim());
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] h-[844px] z-30"
        style={{
          marginTop: "calc((100vh - 844px) / 2)",
          backgroundColor: "#1A1A1A52", // 32% 정도 불투명도
        }}
        onClick={handleClose}
      />

      {/* 가운데 카드 모달 */}
      <div
        className="fixed left-1/2 z-40 w-[232px] h-[200px] -translate-x-1/2
                   rounded-[8px] bg-white px-3 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)] flex flex-col"
        style={{
          marginTop: "calc((100vh - 844px) / 2 + (844px - 200px) / 2)",
        }}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 w-full">
          <div className="w-6" /> {/* 좌측 더미로 제목 가운데 정렬 */}
          <h2 className="flex-1 text-center text-sm font-semibold">
            그룹 입장하기
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="w-6 text-xl leading-none text-gray-600"
          >
            ×
          </button>
        </div>

        {/* 메시지 */}
        <p className="text-sm font-medium text-gray4 text-center">
          스터디장에게 전달받은
        </p>
        <p className="text-sm font-medium text-gray4 text-center mb-4">
          가입 코드를 입력하세요.
        </p>

        {/* 입력 필드 */}
        <div className="mb-2 flex flex-col w-full">
          <div className="flex justify-center">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="가입 코드 입력"
              className="w-[208px] h-[29px] rounded-[8px] border border-main1 bg-white px-4
                         outline-none text-sm placeholder:text-gray-400 text-center"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>

        {/* 입장하기 버튼 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={code.trim() === ""}
            className={`w-[208px] h-[36px] rounded-[8px] text-white text-sm font-semibold transition ${
              code.trim() !== ""
                ? "bg-point hover:bg-[#4C6953] cursor-pointer"
                : "bg-main2 cursor-not-allowed"
            }`}
          >
            입장하기
          </button>
        </div>
      </div>
    </>
  );
}

