import { useState } from "react";

interface CompleteTodoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (file: File | null, comment: string) => void;
}

export default function CompleteTodoModal({
  open,
  onClose,
  onSubmit,
}: CompleteTodoModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const maxCommentLength = 100;

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedFile, comment);
    setSelectedFile(null);
    setComment("");
    onClose();
  };

  const isDisabled = !selectedFile; // 파일은 필수

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-30"
        onClick={onClose}
      />

      {/* 바텀시트 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-40 px-4 pt-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-w-[390px] mx-auto">
        {/* 핸들 바 */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* 인증파일 업로드 */}
        <div className="mb-6">
          <label className="block text-base font-bold text-black1 mb-2">
            인증파일 업로드 <span className="text-red1">*</span>
          </label>
          <label className="block">
            <div className="w-full h-12 rounded-lg border-2 border-main1 flex items-center px-4 cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
              />
              {selectedFile ? (
                <div className="flex items-center gap-2 flex-1">
                  <svg
                    className="w-5 h-5 text-point"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <span className="text-sm text-black1 flex-1 truncate">
                    {selectedFile.name}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <svg
                    className="w-5 h-5 text-point"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <span className="text-sm text-gray4">파일을 선택해주세요</span>
                </div>
              )}
            </div>
          </label>
        </div>

        {/* 소감문 작성 */}
        <div className="mb-6">
          <label className="block text-base font-bold text-black1 mb-2">
            소감문 작성
          </label>
          <div className="relative">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="소감문을 작성해주세요"
              maxLength={maxCommentLength}
              className="w-full h-32 rounded-lg border-2 border-gray1 px-4 py-3 outline-none resize-none text-sm text-black1 placeholder:text-gray4"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray4">
              {comment.length}/{maxCommentLength}자
            </div>
          </div>
        </div>

        {/* 완료하기 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full h-12 rounded-lg text-white text-base font-semibold ${
            isDisabled
              ? "bg-gray2 cursor-not-allowed"
              : "bg-point hover:bg-[#4C6953] transition"
          }`}
        >
          To-Do 완료하기
        </button>
      </div>
    </>
  );
}

