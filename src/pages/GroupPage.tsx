import { useState } from "react";
import book from "../assets/book.svg";
import SortBottomSheet from "../components/SortBottomSheet.tsx";
import AddGroupModal from "../components/AddGroupModal.tsx";
import JoinGroupModal from "../components/JoinGroupModal.tsx";
import ActionMenu from "../components/ActionMenu.tsx";
import SuccessModal from "../components/SuccessModal.tsx";
import type { StudyGroup, SortOrder } from "../types/group";
import { findGroupByCode } from "../mock/groupData";
import plus from "../assets/plus.svg";
import Header from "../components/Header";

export default function GroupPage() {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("최신순");

  const [showSortModal, setShowSortModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showJoinSuccessModal, setShowJoinSuccessModal] = useState(false);
  const [joinSuccessGroupName, setJoinSuccessGroupName] = useState("");

  const handleAddGroup = (data: {
    category: string;
    title: string;
    leader: string;
    totalMembers: number;
  }) => {
    const newGroup: StudyGroup = {
      id: Date.now(),
      category: data.category,
      title: data.title,
      leader: data.leader,
      totalMembers: data.totalMembers,
      currentMembers: 1,
    };
    setStudyGroups((prev) => [...prev, newGroup]);
    setShowSuccessModal(true);
  };

  const sortedGroups = [...studyGroups].sort((a, b) =>
    sortOrder === "최신순" ? b.id - a.id : a.id - b.id
  );

  return (
    // [수정 1] min-h-[844px]: 프레임 높이(844px)만큼 최소 높이를 잡아 배경 끊김 방지
    <div className="flex flex-col min-h-[844px] bg-[#F9FFF6] relative">
      
      <Header title="나의 스터디그룹" showBack={false} />

      {/* 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        {studyGroups.length === 0 ? (
          // 그룹 없을 때: flex-1로 남은 높이 다 차지해서 중앙 정렬
          <div className="flex-1 flex flex-col items-center justify-center text-center text-[#9AC58B] pb-32">
            <img src={book} alt="책 아이콘" className="w-12 h-12 mb-4" />
            <p className="text-sm font-medium">
              아직 가입한
              <br />
              스터디그룹이 없어요
            </p>
          </div>
        ) : (
          <>
            {/* 정렬 버튼 */}
            <div className="pt-4 mb-4 px-4">
              <button
                onClick={() => setShowSortModal(true)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border text-sm text-gray-700"
              >
                {sortOrder}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

            {/* 리스트 영역 (하단 여백 확보) */}
            <div className="px-4 pb-32">
              <div className="flex flex-col gap-3 items-center">
                {sortedGroups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-white rounded-[15px] p-3 border border-[1.5px] border-main2 shadow-sm w-full"
                  >
                    <div className="text-sm text-point font-medium">
                      {group.category}
                    </div>
                    <div className="text-lg font-semibold text-black1 mb-0.5">
                      {group.title}
                    </div>
                    <div className="mb-1 flex gap-2 items-center">
                      <span className="flex items-center">
                        <span className="text-xs text-gray3">스터디장</span>
                        <span className="text-sm text-gray4 ml-1">
                          {group.leader}
                        </span>
                      </span>
                      <span className="flex items-center">
                        <span className="flex items-center text-xs text-gray3">
                          인원
                        </span>
                        <span className="text-sm text-gray4 ml-1">
                          {group.currentMembers}/{group.totalMembers}명
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* [수정 2] sticky 사용: 스크롤해도 화면 하단에 끈적하게 고정됨
          bottom-[88px]: 하단바(64px) + 여백(24px) 위에 위치
          ml-auto mr-6: 오른쪽 정렬 (flex-col 안이라 self-end 대신 margin 사용)
      */}
      <button
        onClick={() => setShowFabMenu(!showFabMenu)}
        aria-label="메뉴 열기"
        className="sticky bottom-[88px] ml-auto mr-6 w-14 h-14 rounded-full bg-main1 text-white shadow-lg
                   flex items-center justify-center text-3xl font-light z-50"
      >
        <img src={plus} alt="plus" className="w-5 h-5" />
      </button>

      {/* --- 모달들 --- */}
      <ActionMenu
        open={showFabMenu}
        onClose={() => setShowFabMenu(false)}
        onJoinGroup={() => {
          setShowJoinModal(true);
          setShowFabMenu(false);
        }}
        onCreateGroup={() => {
          setShowAddModal(true);
          setShowFabMenu(false);
        }}
      />

      <SortBottomSheet
        open={showSortModal}
        current={sortOrder}
        onClose={() => setShowSortModal(false)}
        onApply={(order: SortOrder) => {
          setSortOrder(order);
          setShowSortModal(false);
        }}
      />

      <AddGroupModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(data) => {
          handleAddGroup(data);
          setShowAddModal(false);
        }}
      />

      <JoinGroupModal
        open={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onSubmit={(code: string) => {
          const foundGroup = findGroupByCode(code);
          if (!foundGroup) {
            alert("올바른 가입 코드를 입력해주세요.");
            return;
          }
          const joinedGroup: StudyGroup = {
            ...foundGroup,
            currentMembers: Math.max(2, foundGroup.currentMembers + 1),
          };
          setStudyGroups((prev) => [...prev, joinedGroup]);
          setJoinSuccessGroupName(joinedGroup.title);
          setShowJoinModal(false);
          setShowJoinSuccessModal(true);
        }}
      />

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message1="그룹이 성공적으로"
        message2="생성되었습니다."
        title="그룹 만들기"
      />

      <SuccessModal
        open={showJoinSuccessModal}
        onClose={() => setShowJoinSuccessModal(false)}
        message1={
          <>
            <span className="text-point">{joinSuccessGroupName}</span>
          </>
        }
        message2="그룹에 입장하였습니다."
        title="그룹 입장하기"
      />
    </div>
  );
}