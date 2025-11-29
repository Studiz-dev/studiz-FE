// src/pages/GroupPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import book from "../assets/book.svg";
import SortBottomSheet from "../components/SortBottomSheet.tsx";
import AddGroupModal from "../components/AddGroupModal.tsx";
import JoinGroupModal from "../components/JoinGroupModal.tsx";
import ActionMenu from "../components/ActionMenu.tsx";
import SuccessModal from "../components/SuccessModal.tsx";
import type { StudyGroup, SortOrder } from "../types/group";
import { findGroupByCode } from "../mock/groupData";
import Plus from "../assets/plus.svg?react";
import Header from "../components/Header";


export default function GroupPage() {
  const navigate = useNavigate();
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("최신순");

  const [showSortModal, setShowSortModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showJoinSuccessModal, setShowJoinSuccessModal] = useState(false);
  const [joinSuccessGroupName, setJoinSuccessGroupName] = useState("");

  // 그룹 추가 콜백 (모달에서 호출됨)
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

  // 정렬 적용된 배열
  const sortedGroups = [...studyGroups].sort((a, b) =>
    sortOrder === "최신순" ? b.id - a.id : a.id - b.id
  );

  return (
    <div className="relative flex flex-col h-[744px]">
      <h1 className="text-lg font-semibold text-center mb-8 pt-[40px]">
        나의 스터디그룹
      </h1>

      {/* 컨텐츠 영역 */}
      <div className="bg-[#F9FFF6] flex-1 pb-16">
        {studyGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-[#9AC58B]">
            <img src={book} alt="책 아이콘" className="w-12 h-12 mb-4" />
            <p className="text-sm font-medium">
              아직 가입한
              <br />
              스터디그룹이 없어요
            </p>
          </div>
        ) : (
          <>
            {/* 정렬 기준 버튼 */}
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

            {/* 스터디 리스트 */}
            <div className="overflow-y-auto px-4 pb-4">
              <div className="flex flex-col gap-3 items-center">
                {sortedGroups.map((group) => (
                  <div
                    key={group.id}
                    onClick={() => navigate("/GroupHome")}
                    className="bg-white rounded-[15px] p-3 border border-[1.5px] border-main2 shadow-sm w-full cursor-pointer hover:bg-gray-50 transition"
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
                        <span className="text-sm text-gray4 ml-1">{group.leader}</span>
                      </span>
                      <span className="flex items-center">
                      <span className="flex items-center text-xs text-gray3">인원</span>
                      <span className="text-sm text-gray4 ml-1">{group.currentMembers}/{group.totalMembers}명</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* 플로팅 + 버튼 */}
      <button
        onClick={() => setShowFabMenu(!showFabMenu)}
        aria-label="메뉴 열기"
        className="absolute bottom-28 right-4 w-14 h-14 rounded-full bg-main1 text-white shadow-lg
                   flex items-center justify-center text-3xl font-light z-30"
      >

        <Plus className="w-5 h-5 text-white" />

      </button>

      {/* 액션 메뉴 */}
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

      {/* 정렬 바텀시트 모달 */}
      <SortBottomSheet
        open={showSortModal}
        current={sortOrder}
        onClose={() => setShowSortModal(false)}
        onApply={(order: SortOrder) => {
          setSortOrder(order);
          setShowSortModal(false);
        }}
      />

      {/* 스터디 추가 모달 */}
      <AddGroupModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(data: {
          category: string;
          title: string;
          leader: string;
          totalMembers: number;
        }) => {
          handleAddGroup(data);
          setShowAddModal(false);
        }}
      />

      {/* 그룹 입장 모달 */}
      <JoinGroupModal
        open={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onSubmit={(code: string) => {
          // mock data에서 가입 코드로 그룹 찾기
          const foundGroup = findGroupByCode(code);
          
          if (!foundGroup) {
            // 그룹을 찾지 못한 경우 (에러 처리)
            alert("올바른 가입 코드를 입력해주세요.");
            return;
          }
          
          // 입장한 그룹 정보 생성 (currentMembers는 최소 2명)
          const joinedGroup: StudyGroup = {
            ...foundGroup,
            currentMembers: Math.max(2, foundGroup.currentMembers + 1), // 최소 2명, 기존 인원 + 1
          };
          
          // 그룹을 리스트에 추가
          setStudyGroups((prev) => [...prev, joinedGroup]);
          
          // 성공 모달 표시
          setJoinSuccessGroupName(joinedGroup.title);
          setShowJoinModal(false);
          setShowJoinSuccessModal(true);
        }}
      />

      {/* 그룹 생성 성공 모달 */}
      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message1="그룹이 성공적으로"
        message2="생성되었습니다."
        title="그룹 만들기"
      />

      {/* 그룹 입장 성공 모달 */}
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
