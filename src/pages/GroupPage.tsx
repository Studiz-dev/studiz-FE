import { useState } from "react";
import book from "../assets/book.svg";

interface StudyGroup {
  id: number;
  category: string; 
  title: string; 
  leader: string;
  totalMembers: number;
}

export default function GroupPage() {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("최신순");
  
  // 입력 폼 상태
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    leader: "",
    totalMembers: "",
  });

  const handleAddGroup = () => {
    if (!formData.category || !formData.title || !formData.leader || !formData.totalMembers) {
      return; // 필수 입력 확인
    }
    
    const newGroup: StudyGroup = {
      id: Date.now(),
      category: formData.category,
      title: formData.title,
      leader: formData.leader,
      totalMembers: parseInt(formData.totalMembers) || 0,
    };
    setStudyGroups([...studyGroups, newGroup]);
    setShowAddModal(false);
    // 폼 초기화
    setFormData({
      category: "",
      title: "",
      leader: "",
      totalMembers: "",
    });
  };

  return (
    <div className="mt-[120px] relative">
      {/* 프레임 내부 컨테이너 */}
          <h1 className="text-lg font-semibold text-center mb-4">나의 스터디그룹</h1>

        {/* 컨텐츠 영역 (HomePage와 동일한 연두색 배경, 좌우 꽉차게) */}
        <div className="mx-[-16px] bg-[#F9FFF6] min-h-[calc(844px-120px-60px)] pb-24">
          {studyGroups.length === 0 ? (
            /* 빈 상태 메시지 */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-[#9AC58B]">
              <img src={book} alt="책 아이콘" className="w-12 h-12 mb-4" />
              <p className="text-sm font-medium">
                아직 가입한
                <br />
                스터디그룹이 없어요
              </p>
            </div>
          ) : (
            <>
              {/* 정렬 필터 */}
              <div className="pt-4 mb-4" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                <button
                  onClick={() => setSortOrder(sortOrder === "최신순" ? "인기순" : "최신순")}
                  className="flex items-center gap-1 text-sm text-gray-700"
                >
                  {sortOrder}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              {/* 스터디 그룹 목록 */}
              <div className="overflow-y-auto max-h-[calc(844px-120px-60px-80px)]" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                <div className="flex flex-col gap-3 items-center">
                  {studyGroups.map((group) => (
                    <div
                      key={group.id}
                      className="bg-white rounded-lg p-4 border border-[#E8F5E3] shadow-sm w-[360px]"
                    >
                      <div className="text-xs text-[#9AC58B] font-medium mb-1">
                        {group.category}
                      </div>
                      <div className="text-base font-semibold text-gray-900 mb-2">
                        {group.title}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">스터디장 {group.leader}</div>
                      <div className="text-xs text-gray-500">
                        인원 {group.totalMembers}명
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* 플로팅 + 버튼 (하단 고정, 모바일 프레임 내부) */}
        <button
          onClick={() => setShowAddModal(true)}
          aria-label="그룹 추가"
          className="absolute bottom-24 right-5 w-14 h-14 rounded-full bg-[#9AC58B] text-white shadow-lg
                     flex items-center justify-center text-3xl font-light z-20"
        >
          +
        </button>

        {/* 그룹 추가 입력 모달 */}
        {showAddModal && (
          <>
            {/* 배경 오버레이 (모바일 프레임 전체 덮기) */}
            <div
              className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] h-[844px] bg-black bg-opacity-20 z-30"
              style={{ marginTop: 'calc((100vh - 844px) / 2)' }}
              onClick={() => {
                setShowAddModal(false);
                setFormData({
                  category: "",
                  title: "",
                  leader: "",
                  totalMembers: "",
                });
              }}
            />
            {/* 모달 컨텐츠 */}
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl z-40 p-6 max-h-[80vh] overflow-y-auto -mx-4">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">스터디 그룹 추가</h2>
                
                {/* 스터디종류 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    스터디종류
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="예: 척척학사"
                    className="w-full h-12 rounded-lg border-2 border-gray-200 focus:border-[#9AC58B] bg-white px-4 py-3 outline-none text-sm"
                  />
                </div>

                {/* 스터디명 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    스터디명
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="예: 시프공부를하자"
                    className="w-full h-12 rounded-lg border-2 border-gray-200 focus:border-[#9AC58B] bg-white px-4 py-3 outline-none text-sm"
                  />
                </div>

                {/* 스터디장 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    스터디장
                  </label>
                  <input
                    type="text"
                    value={formData.leader}
                    onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                    placeholder="예: 나영이"
                    className="w-full h-12 rounded-lg border-2 border-gray-200 focus:border-[#9AC58B] bg-white px-4 py-3 outline-none text-sm"
                  />
                </div>

                {/* 인원 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    인원
                  </label>
                  <input
                    type="number"
                    value={formData.totalMembers}
                    onChange={(e) => setFormData({ ...formData, totalMembers: e.target.value })}
                    placeholder="예: 5"
                    className="w-full h-12 rounded-lg border-2 border-gray-200 focus:border-[#9AC58B] bg-white px-4 py-3 outline-none text-sm"
                  />
                </div>

                {/* 버튼 */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setFormData({
                        category: "",
                        title: "",
                        leader: "",
                        totalMembers: "",
                      });
                    }}
                    className="flex-1 h-12 rounded-lg border-2 border-gray-200 text-gray-700 font-medium"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleAddGroup}
                    className="flex-1 h-12 rounded-lg bg-[#9AC58B] text-white font-medium"
                  >
                    추가
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
  );
}
