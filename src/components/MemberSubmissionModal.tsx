interface MemberSubmissionModalProps {
  open: boolean;
  onClose: () => void;
  memberName: string;
  fileName?: string;
  comment?: string;
}

export default function MemberSubmissionModal({
  open,
  onClose,
  memberName,
  fileName,
  comment,
}: MemberSubmissionModalProps) {
  if (!open) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-50"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-32px)] max-w-[320px] bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.16)] px-6 py-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-black1">{memberName}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 text-gray4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 인증파일 */}
        <div className="mb-6">
          <label className="block text-base font-bold text-black1 mb-2">
            인증파일
          </label>
          <div className="w-full h-12 rounded-lg border-2 border-main1 flex items-center px-4">
            {fileName ? (
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
                  {fileName}
                </span>
              </div>
            ) : (
              <span className="text-sm text-gray4">파일 없음</span>
            )}
          </div>
        </div>

        {/* 소감문 */}
        <div>
          <label className="block text-base font-bold text-black1 mb-2">
            소감문
          </label>
          <div className="w-full min-h-32 rounded-lg border-2 border-gray1 px-4 py-3">
            <p className="text-sm text-black1 whitespace-pre-wrap">
              {comment || "소감문입니다."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

