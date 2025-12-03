// src/pages/GroupPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import book from "../assets/book.svg";
import SortBottomSheet from "../components/SortBottomSheet.tsx";
import AddGroupModal from "../components/AddGroupModal.tsx";
import JoinGroupModal from "../components/JoinGroupModal.tsx";
import ActionMenu from "../components/ActionMenu.tsx";
import SuccessModal from "../components/SuccessModal.tsx";
import type { StudyGroup, SortOrder } from "../types/group";
import { createStudy, getStudyByInviteCode } from "../services/study.service";
import Plus from "../assets/plus.svg?react";


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
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState("");

  // 그룹 추가 콜백 (모달에서 호출됨)
  const handleAddGroup = async (data: {
    name: string;
    category: string;
    totalMembers: number;
    description: string;
  }) => {
    try {
      const response = await createStudy({
        name: data.name,
        description: data.description,
      });

      // API 응답을 StudyGroup 형식으로 변환
      const newGroup: StudyGroup = {
        id: response.id, // UUID 그대로 사용
        category: data.category, // 모달에서 입력받은 모임명
        title: response.name,
        leader: "나", // 생성자는 자동으로 스터디장
        totalMembers: data.totalMembers, // 모달에서 입력받은 인원수
        currentMembers: 1, // 생성자 포함
        createdAt: response.createdAt, // 생성일시 저장 (정렬용)
      };

      setStudyGroups((prev) => [...prev, newGroup]);
      setShowAddModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("스터디 생성 실패:", error);
      alert("스터디 생성 중 오류가 발생했습니다.");
    }
  };

  // 정렬 적용된 배열 (createdAt 우선, 없으면 id 기준)
  const sortedGroups = [...studyGroups].sort((a, b) => {
    // createdAt이 있으면 사용, 없으면 id 기준
    const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    
    if (aDate !== 0 || bDate !== 0) {
      // createdAt 기준 정렬
      return sortOrder === "최신순" ? bDate - aDate : aDate - bDate;
    } else {
      // createdAt이 없으면 id 기준 정렬
      return sortOrder === "최신순" 
        ? b.id.localeCompare(a.id) 
        : a.id.localeCompare(b.id);
    }
  });

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
                    onClick={() => navigate("/GroupHome", { state: { studyId: group.id } })}
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
        className="fixed bottom-28 right-4 w-14 h-14 rounded-full bg-main1 text-white shadow-lg
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
        onSubmit={handleAddGroup}
      />

      {/* 그룹 입장 모달 */}
      <JoinGroupModal
        open={showJoinModal}
        onClose={() => {
          setShowJoinModal(false);
          setJoinError("");
        }}
        onSubmit={async (code: string) => {
          setIsJoining(true);
          setJoinError("");

          try {
            // API로 초대 코드로 스터디 정보 조회
            const studyInfo = await getStudyByInviteCode(code);

            // API 응답을 StudyGroup 형식으로 변환
            const joinedGroup: StudyGroup = {
              id: studyInfo.id, // UUID
              category: "", // API 응답에 없음
              title: studyInfo.name,
              leader: "", // API 응답에 없음
              totalMembers: 0, // API 응답에 없음
              currentMembers: 1, // 가입한 사용자 포함
              createdAt: studyInfo.createdAt, // 생성일시
            };

            // 그룹을 리스트에 추가
            setStudyGroups((prev) => [...prev, joinedGroup]);

            // 성공 모달 표시
            setJoinSuccessGroupName(joinedGroup.title);
            setShowJoinModal(false);
            setShowJoinSuccessModal(true);
          } catch (error) {
            console.error("스터디 조회 실패:", error);
            if (error instanceof AxiosError) {
              const status = error.response?.status;
              if (status === 404) {
                setJoinError("존재하지 않는 초대코드입니다.");
              } else {
                setJoinError("스터디 정보 조회 중 오류가 발생했습니다.");
              }
            } else {
              setJoinError("알 수 없는 오류가 발생했습니다.");
            }
          } finally {
            setIsJoining(false);
          }
        }}
        isLoading={isJoining}
        error={joinError}
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
