import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createSchedule } from "../services/schedule.service";
import type { CreateScheduleRequest } from "../types/schedule";
import Header from "../components/Header";
import LabeledInput from "../components/CreateScheduleToDo/LabeledInput";
import NumberInputBox from "../components/CreateScheduleToDo/NumberInputBox";
import ActionButton from "../components/ActionButton"; 
import SuccessModal from "../components/SuccessModal";

export default function CreateSchedulePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const studyId = location.state?.studyId as string | undefined;

  const [scheduleName, setScheduleName] = useState("");
  const [place, setPlace] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const [month, setMonth] = useState<number | string>(today.getMonth() + 1);
  const [day, setDay] = useState<number | string>(today.getDate());

  useEffect(() => {
    if (!studyId) {
      alert("잘못된 접근입니다. 스터디 그룹 페이지로 돌아갑니다.");
      navigate("/GroupHome", { replace: true });
    }
  }, [studyId, navigate]);

  const isDisabled = scheduleName.trim() === "" || loading;

  const formatStartDate = (): string | null => {
    if (!month || !day) return null;
    const year = new Date().getFullYear();
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    
    const date = new Date(`${year}-${formattedMonth}-${formattedDay}`);
    if (isNaN(date.getTime())) return null;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

 const handleCreateSchedule = async () => {
    if (isDisabled || !studyId) return;
    
    setLoading(true);
    setError(null);

    const startDate = formatStartDate();
    if (!startDate) {
      setError("유효한 날짜를 입력해주세요.");
      setLoading(false);
      return;
    }

    const requestData: CreateScheduleRequest = {
      title: scheduleName,
      startDate: startDate,
      location: place || undefined,
    };

    try {
      await createSchedule(studyId, requestData);
      setShowModal(true);
    } catch (err: any) {
      console.error("Error creating schedule:", err);
      setError(err.response?.data?.message || "일정 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowModal(false); 
    navigate("/GroupHome", { state: { studyId } });
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white">
      <Header title="일정 생성하기" backPath="/GroupHome" /> 
      <form className="flex flex-col flex-1">
        <LabeledInput label="이름" placeholder="일정의 이름을 적어주세요" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
        <LabeledInput label="장소 (선택)" placeholder="장소를 적어주세요" value={place} onChange={(e) => setPlace(e.target.value)} />
        
        {/* Simplified Date Picker */}
        <div className="flex flex-col gap-3 px-4 pt-5">
            <label className="text-[16px] font-semibold text-black1">
                날짜 선택
            </label>
            <div className="flex items-center pb-4 border-b-[1.5px] border-main4 gap-2 text-[14px] font-medium text-black1">
                <NumberInputBox value={month} onChange={(e) => setMonth(e.target.value)} />
                <span>월</span>
                <NumberInputBox value={day} onChange={(e) => setDay(e.target.value)} />
                <span>일</span>
            </div>
        </div>
      </form>
      
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-auto">
        <ActionButton
              text={loading ? "생성 중..." : "일정 생성하기"}
              onClick={handleCreateSchedule}
              isDisabled={isDisabled}
              type="button" 
          />
      </div>

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