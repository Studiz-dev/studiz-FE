import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LabeledInput from "../components/LabeledInput";
import DeadlineSelector from "../components/DeadlineSelector";
import Method from "../components/Method";
// import MemberSelect from "../components/MemberSelect";
import ActionButton from "../components/ActionButton";
import SuccessModal from "../components/SuccessModal";

export default function CreateToDoPage() {
  const navigate = useNavigate();
  // 상태 관리 (입력창과 연결할 데이터)
  const [scheduleName, setScheduleName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedMethods, setSelectedMethods] = useState({
    file: false,
    text: false,
  })
  const isDisabled = scheduleName.trim() === "";

  const handleCreateSchedule = () => {
    if (isDisabled) return;
    console.log("선택된 인증 방식:", selectedMethods);
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/Home"); // [요청] 홈 페이지로 연결
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <Header title="To-Do 생성하기" backPath="/Home" />
      <form className="flex flex-col">
        <LabeledInput label="이름" placeholder="To-Do의 이름을 적어주세요" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
        <DeadlineSelector />
        <Method selectedMethods={selectedMethods} setSelectedMethods={setSelectedMethods} />
        <MemberSelect />
      </form>
      <div className="fixed bottom-10 w-full left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white z-20 pt-4 pb-6">
        <ActionButton
          text="To-Do 생성하기"
          onClick={handleCreateSchedule}
          isDisabled={isDisabled}
          type="button"
        />
      </div>
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