import { useState, useEffect  } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import Header from "../components/Header";
import LabeledInput from "../components/CreateScheduleToDo/LabeledInput";
import DeadlineSelector from "../components/CreateScheduleToDo/DeadlineSelector";
import Method from "../components/CreateScheduleToDo/Method";
import SelectMember from "../components/CreateScheduleToDo/SelectMember";
import ActionButton from "../components/ActionButton";
import SuccessModal from "../components/SuccessModal";

import type { SelectableMember } from "../types/member";
import { dummyMembers } from "../mock/memberData";
import { createTodo } from "../services/todo.service"; // Import createTodo
import type { CreateTodoRequest } from "../types/todo"; // Import types

export default function CreateToDoPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation
  const studyId = location.state?.studyId as string | undefined; // Get studyId from state

  // State management
  const [scheduleName, setScheduleName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // For API call loading state
  const [error, setError] = useState<string | null>(null); // For API call error state

  // State for DeadlineSelector
  const today = new Date();
  const [month, setMonth] = useState<number | string>(today.getMonth() + 1);
  const [day, setDay] = useState<number | string>(today.getDate());
  const [hour, setHour] = useState<number | string>(today.getHours());
  const [minute, setMinute] = useState<number | string>(today.getMinutes());

  const [selectedMethods, setSelectedMethods] = useState({
    file: false,
    text: false,
  })

  const [members, setMembers] = useState<SelectableMember[]>([]);

  useEffect(() => {
    // If no studyId, redirect to group home
    if (!studyId) {
      navigate("/GroupHome", { replace: true });
      return;
    }
    // 더미 멤버 상태 초기화
    setMembers(dummyMembers.map((m) => ({ ...m, checked: false })));
  }, [studyId, navigate]);

  const toggleMember = (id: number) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, checked: !m.checked } : m
      )
    );
  };

  // Helper function to format date
  const formatDateTime = (): string | null => {
    if (!month || !day || !hour || !minute) return null;

    const currentYear = new Date().getFullYear();
    // Pad single digits with leading zero
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');

    // Basic validation for date parts (can be more robust)
    if (
      isNaN(currentYear) || isNaN(parseInt(formattedMonth)) || isNaN(parseInt(formattedDay)) ||
      isNaN(parseInt(formattedHour)) || isNaN(parseInt(formattedMinute))
    ) {
      return null;
    }

    try {
      const date = new Date(`${currentYear}-${formattedMonth}-${formattedDay}T${formattedHour}:${formattedMinute}:00`);
      if (isNaN(date.getTime())) {
        return null; // Invalid date
      }
      return date.toISOString().slice(0, 19); // Format to YYYY-MM-DDTHH:mm
    } catch (e) {
      console.error("Date formatting error:", e);
      return null;
    }
  };

  const isDisabled = scheduleName.trim() === "" || loading;

  const handleCreateSchedule = async () => {
    if (isDisabled || !studyId) return;

    setLoading(true);
    setError(null);

    const selectedParticipantIds = members.filter((m) => m.checked).map((m) => m.id);
    const certificationTypes: ("TEXT_NOTE" | "FILE_UPLOAD")[] = [];
    if (selectedMethods.text) {
      certificationTypes.push("TEXT_NOTE");
    }
    if (selectedMethods.file) {
      certificationTypes.push("FILE_UPLOAD");
    }

    const dueDate = formatDateTime();

    if (!dueDate) {
      setError("유효한 마감 기한을 입력해주세요.");
      setLoading(false);
      return;
    }

    const requestData: CreateTodoRequest = {
      name: scheduleName,
      dueDate: dueDate + ":00", // Append seconds to match YYYY-MM-DDTHH:mm:ss format
      certificationTypes: certificationTypes,
      participantIds: selectedParticipantIds,
    };

    try {
      await createTodo(studyId, requestData);
      setShowModal(true);
    } catch (err: any) {
      console.error("Error creating todo:", err);
      setError(err.response?.data?.message || "To-Do 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate(`/GroupHome`, { state: { studyId } }); // Pass studyId back to GroupHome
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-white">
      <Header title="To-Do 생성하기" backPath="/GroupHome" />
      <form className="flex flex-col">
        <LabeledInput label="이름" placeholder="To-Do의 이름을 적어주세요" value={scheduleName} onChange={(e) => setScheduleName(e.target.value)} />
        <DeadlineSelector
          month={month} setMonth={setMonth}
          day={day} setDay={setDay}
          hour={hour} setHour={setHour}
          minute={minute} setMinute={setMinute}
        />
        <Method selectedMethods={selectedMethods} setSelectedMethods={setSelectedMethods} />
        <SelectMember members={members} onToggle={toggleMember}/>
      </form>
      {error && <p className="text-red-500 text-center mt-2 px-4">{error}</p>}
      <ActionButton
          text={loading ? "생성 중..." : "To-Do 생성하기"}
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