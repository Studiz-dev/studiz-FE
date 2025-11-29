import { useState } from "react";
import Header from "../components/Header";
import { mockTodoData } from "../mock/todoData";
import CompleteTodoModal from "../components/CompleteTodoModal";
import TodoCompleteSuccessModal from "../components/TodoCompleteSuccessModal";
import MemberSubmissionModal from "../components/MemberSubmissionModal";
import type { TodoMember } from "../types/todo";
import checkIcon from "../assets/check.svg";

export default function ToDoPage() {
  const [todoData, setTodoData] = useState(mockTodoData);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TodoMember | null>(null);

  const handleComplete = (file: File | null, comment: string) => {
    // ToDo 완료 처리
    setTodoData((prev) => ({
      ...prev,
      isUserCompleted: true,
    }));
    // 여기서 실제로는 API 호출하여 서버에 제출
    console.log("File:", file);
    console.log("Comment:", comment);

    // 완료 모달 닫고 성공 모달 열기
    setShowCompleteModal(false);
    setShowSuccessModal(true);
  };

  const isCompleted = todoData.isUserCompleted ?? false;

  // "나" 멤버 생성
  const meMember: TodoMember = {
    id: 0,
    name: "나",
    isCompleted: isCompleted,
    isMe: true,
    submittedFile: isCompleted ? "my_submission.pdf" : undefined,
    submittedComment: isCompleted ? "소감문입니다." : undefined,
  };

  // 완료/미완료 멤버 목록에 "나" 추가 (기존 멤버에서 "나" 제외)
  const completedMembers = todoData.completedMembers.filter(m => !m.isMe);
  const incompleteMembers = todoData.incompleteMembers.filter(m => !m.isMe);

  if (isCompleted) {
    completedMembers.unshift(meMember); // 완료 멤버 맨 위에 추가
  } else {
    incompleteMembers.unshift(meMember); // 미완료 멤버 맨 위에 추가
  }

  // 진행률 계산: 완료 멤버 수 / 전체 멤버 수 * 100
  const totalMembers = completedMembers.length + incompleteMembers.length;
  const progress = totalMembers > 0 ? Math.round((completedMembers.length / totalMembers) * 100) : 0;

  return (
    <div className="flex flex-col h-full bg-white relative">
      <Header title="To-Do" backPath="/GroupHome" />

      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-32">
        {/* 그룹명 */}
        <div className="text-sm text-point font-medium mb-2">
          {todoData.groupName}
        </div>

        {/* 할 일 제목 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-black1 flex-1">
            {todoData.title}
          </h2>
          <span className="text-sm font-semibold text-point ml-2">
            {completedMembers.length}/{totalMembers}
          </span>
        </div>

        {/* 완료 기한 */}
        <div className="text-sm text-gray4 mb-4">
          완료 기한: {todoData.dueDate}
        </div>

        {/* 진행률 바 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-black1">진행률 {progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray1 rounded-full overflow-hidden">
            <div
              className="h-full bg-point transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 완료 멤버 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-black1">완료 멤버</h3>
            <span className="text-sm font-medium text-point">
              {completedMembers.length}명
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {completedMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  setSelectedMember(member);
                  setShowMemberModal(true);
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gray2 flex-shrink-0" />
                <span className={`flex-1 text-base font-medium ${member.isMe ? "text-point" : "text-black1"}`}>
                  {member.name}
                </span>
                <img
                  src={checkIcon}
                  alt="완료"
                  className="w-5 h-5 flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 미완료 멤버 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-black1">미완료 멤버</h3>
            <span className="text-sm font-medium text-point">
              {incompleteMembers.length}명
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {incompleteMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gray2 flex-shrink-0" />
                <span className={`flex-1 text-base font-medium ${member.isMe ? "text-point" : "text-black1"}`}>
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼/배너 */}
      {isCompleted ? (
        <div className="absolute bottom-0 left-0 right-0 bg-main2 rounded-t-[20px] px-4 py-4">
          <div className="text-center text-white text-base font-medium">
            To-Do를 완료하였습니다.
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4">
          <button
            type="button"
            onClick={() => setShowCompleteModal(true)}
            className="w-full h-12 rounded-lg bg-point text-white text-base font-semibold hover:bg-[#4C6953] transition"
          >
            To-Do 완료하기
          </button>
        </div>
      )}

      {/* 완료 모달 */}
      <CompleteTodoModal
        open={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        onSubmit={handleComplete}
      />

      {/* 성공 모달 */}
      <TodoCompleteSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* 멤버 제출 정보 모달 */}
      <MemberSubmissionModal
        open={showMemberModal}
        onClose={() => {
          setShowMemberModal(false);
          setSelectedMember(null);
        }}
        memberName={selectedMember?.name || ""}
        fileName={selectedMember?.submittedFile}
        comment={selectedMember?.submittedComment || "소감문입니다."}
      />
    </div>
  );
}

