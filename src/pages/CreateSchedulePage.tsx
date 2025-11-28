import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LabeledInput from "../components/CreateScheduleToDo/LabeledInput";
import DateRangeSelector from "../components/CreateScheduleToDo/DateRangeSelector";
import TimeRangeSelector from "../components/CreateScheduleToDo/TimeRangeSelector";
import DeadlineSelector from "../components/CreateScheduleToDo/DeadlineSelector";
import ActionButton from "../components/ActionButton"; 
import SuccessModal from "../components/SuccessModal";

export default function CreateSchedulePage() {
  const navigate = useNavigate();
  // 상태 관리 (입력창과 연결할 데이터)
  const [scheduleName, setScheduleName] = useState("");
  const [place, setPlace] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isDisabled = scheduleName.trim() === "";

 const handleCreateSchedule = () => {
    if (isDisabled) return;
    
    // 폼 데이터 서버 전송 로직 (추가 예정)
    console.log("일정 생성 데이터 제출:", { scheduleName, place });

    // [수정] 모달 표시
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false); 
    navigate("/GroupHome"); // [요청] 홈 페이지로 연결
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white">
      <Header title="일정 생성하기" backPath="/GroupHome" /> 
      <form className="flex flex-col">
        <LabeledInput label="이름" placeholder="일정의 이름을 적어주세요" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
        <LabeledInput label="장소" placeholder="장소를 적어주세요" value={place} onChange={(e) => setPlace(e.target.value)} />
        <DateRangeSelector />
        <TimeRangeSelector />
        <DeadlineSelector />
      </form>
      <ActionButton
            text="일정 생성하기"
            onClick={handleCreateSchedule}
            isDisabled={isDisabled}
            type="button" 
        />
      <SuccessModal 
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="일정 생성하기"
        message1="일정이 성공적으로"
        message2="생성되었습니다."
      />
    </div>

  );
}