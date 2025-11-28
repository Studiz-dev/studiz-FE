import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LabeledInput from "../components/CreateScheduleToDo/LabeledInput";
import DeadlineSelector from "../components/CreateScheduleToDo/DeadlineSelector";
import Method from "../components/CreateScheduleToDo/Method";
import SelectMember from "../components/CreateScheduleToDo/SelectMember";
import ActionButton from "../components/ActionButton";
import SuccessModal from "../components/SuccessModal";

import type { SelectableMember } from "../types/member";
import { dummyMembers } from "../mock/memberData";

export default function CreateToDoPage() {
  const navigate = useNavigate();
  // 상태 관리 
  const [scheduleName, setScheduleName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedMethods, setSelectedMethods] = useState({
    file: false,
    text: false,
  })

  const [members, setMembers] = useState<SelectableMember[]>([]);

  useEffect(() => { // 더미 멤버 상태 초기화
    setMembers(dummyMembers.map((m) => ({ ...m, checked: false })));
  }, []);

   const toggleMember = (id: number) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, checked: !m.checked } : m
      )
    );
  };

  const isDisabled = scheduleName.trim() === "";

  const handleCreateSchedule = () => {
    if (isDisabled) return;
    const selectedMembers = members.filter((m) => m.checked);
    console.log("선택된 인증 방식:", selectedMethods);
    console.log("선택된 멤버:", selectedMembers);
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/GroupHome"); // [요청] 홈 페이지로 연결
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-white">
      <Header title="To-Do 생성하기" backPath="/Home" />
      <form className="flex flex-col">
        <LabeledInput label="이름" placeholder="To-Do의 이름을 적어주세요" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
        <DeadlineSelector />
        <Method selectedMethods={selectedMethods} setSelectedMethods={setSelectedMethods} />
        <SelectMember members={members} onToggle={toggleMember}/>
      </form>
      <ActionButton
          text="To-Do 생성하기"
          onClick={handleCreateSchedule}
          isDisabled={isDisabled}
          type="button"
        />
      <SuccessModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="To-Do 생성하기"
        message1="To-Do가 성공적으로"
        message2="생성되었습니다."
      />
    </div>

  );
}