// src/components/AddGroupModal.tsx
import { useState, useEffect } from "react";

interface AddGroupModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    category: string;
    totalMembers: number;
    description: string;
  }) => void;
}

export default function AddGroupModal({
  open,
  onClose,
  onSubmit,
}: AddGroupModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [totalMembers, setTotalMembers] = useState("");
  const [description, setDescription] = useState("");
  const [memberError, setMemberError] = useState("");

  // 모달 열릴 때마다 폼 초기화
  useEffect(() => {
    if (open) {
      setName("");
      setCategory("");
      setTotalMembers("");
      setDescription("");
      setMemberError("");
    }
  }, [open]);

  if (!open) return null;

  // 필수 필드 검증
  const isFormValid =
    name.trim() !== "" &&
    category.trim() !== "" &&
    totalMembers !== "" &&
    parseInt(totalMembers, 10) > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;

    onSubmit({
      name: name.trim(),
      category: category.trim(),
      totalMembers: Math.min(99, Math.max(1, parseInt(totalMembers, 10) || 1)),
      description: description.trim(),
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] h-[744px] z-30"
        style={{
          marginTop: "calc((100vh - 744px) / 2)",
          backgroundColor: "#1A1A1A52", // 32% 정도 불투명도
        }}
        onClick={handleClose}
      />

      {/* 가운데 카드 모달 */}
      <div
        className="fixed left-1/2 z-40 w-[232px] h-[368px] -translate-x-1/2
                   rounded-[8px] bg-white px-3 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)] flex flex-col"
        style={{
          marginTop: "calc((100vh - 744px) / 2 + (744px - 368px) / 2)",
        }}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 w-full">
          <div className="w-6" /> {/* 좌측 더미로 제목 가운데 정렬 */}
          <h2 className="flex-1 text-center text-sm font-semibold">
            그룹 만들기
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="w-6 text-xl leading-none text-gray-600"
          >
            ×
          </button>
        </div>

        {/* 스터디명 */}
        <div className="mb-2 flex flex-col w-full">
          <label className="block text-sm font-medium text-gray-800 mb-2 text-left">
            스터디명
          </label>
          <div className="flex justify-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="스터디명을 입력해 주세요"
              className="w-[208px] h-[29px] rounded-[8px] border border-main1 bg-white px-4
                         outline-none text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* 모임명 */}
        <div className="mb-2 flex flex-col w-full">
          <label className="block text-sm font-medium text-gray-800 mb-2 text-left">
            모임명
          </label>
          <div className="flex justify-center">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="모임명을 입력해 주세요"
              className="w-[208px] h-[29px] rounded-[8px] border border-main1 bg-white px-4
                         outline-none text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* 인원 수 */}
        <div className="mb-2 flex flex-col w-full">
          <div className="flex items-center gap-2 w-full mb-1">
            <label className="text-sm font-medium text-gray-800 text-left whitespace-nowrap">
              인원 수
            </label>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={totalMembers}
                onChange={(e) => {
                  const v = e.target.value;
                  // 숫자만 허용
                  if (v === "") {
                    setTotalMembers("");
                    setMemberError("");
                    return;
                  }
                  
                  // 숫자가 아닌 문자가 포함되어 있는지 확인
                  const hasNonNumeric = /[^0-9]/.test(v);
                  if (hasNonNumeric) {
                    setMemberError("숫자만 입력가능합니다.");
                    // 숫자가 아닌 문자 제거
                    const numericOnly = v.replace(/[^0-9]/g, "");
                    setTotalMembers(numericOnly);
                    return;
                  }
                  
                  const numericValue = v.replace(/[^0-9]/g, "");
                  if (numericValue === "") {
                    setTotalMembers("");
                    setMemberError("");
                    return;
                  }
                  
                  const num = parseInt(numericValue, 10);
                  
                  // 0 입력 시 에러 메시지
                  if (num === 0) {
                    setMemberError("1 이상의 숫자를 입력해주세요.");
                    setTotalMembers("0");
                    return;
                  }
                  if (num > 99) {
                    setMemberError("99 이하의 숫자를 입력해주세요.");
                    setTotalMembers("0");
                    return;
                  }
                  
                  // 유효한 숫자 입력 시 에러 메시지 제거
                  setMemberError("");
                  // 최대 99명까지
                  const finalNum = Math.min(99, Math.max(1, num));
                  setTotalMembers(finalNum.toString());
                }}
                placeholder="0"
                className="w-[40px] h-[25px] rounded-[8px] border border-[#9AC58B] bg-white
                           text-center text-sm outline-none [appearance:textfield]"
              />
              <span className="text-sm text-gray-800">명</span>
            </div>
          </div>
          {/* 에러 메시지 영역 - 항상 같은 높이 유지 */}
          <div className="h-4 flex items-start justify-end pr-2">
            {memberError && (
              <p className="text-xs text-red-500 text-right">
                {memberError}
              </p>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-[208px] h-[36px] rounded-[8px] text-white text-sm font-semibold transition ${
              isFormValid
                ? "bg-point hover:bg-[#4C6953] cursor-pointer"
                : "bg-main2 cursor-not-allowed"
            }`}
          >
            그룹 만들기
          </button>
        </div>
      </div>
    </>
  );
}