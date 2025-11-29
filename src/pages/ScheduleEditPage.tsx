import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function ScheduleEditPage() {
  const navigate = useNavigate();
  
  // 날짜 데이터 (월~금)
  const dates = [
    { day: "월", date: "1", fullDate: "9/1 월" },
    { day: "화", date: "2", fullDate: "9/2 화" },
    { day: "수", date: "3", fullDate: "9/3 수" },
    { day: "목", date: "4", fullDate: "9/4 목" },
    { day: "금", date: "5", fullDate: "9/5 금" },
  ];
  
  const [selectedDate, setSelectedDate] = useState("9/4 목"); // 기본 선택 날짜
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());
  
  // 시간 슬롯 (0시부터 23시까지)
  const timeSlots = [];
  for (let hour = 0; hour <= 23; hour++) {
    timeSlots.push({ hour, minute: 0 });
  }
  
  // 시간 토글
  const handleTimeToggle = (hour: number, minute: number) => {
    const timeKey = `${selectedDate}-${hour}-${minute}`;
    const newSelectedTimes = new Set(selectedTimes);
    if (newSelectedTimes.has(timeKey)) {
      newSelectedTimes.delete(timeKey);
    } else {
      newSelectedTimes.add(timeKey);
    }
    setSelectedTimes(newSelectedTimes);
  };
  
  // 저장하기
  const handleSave = () => {
    console.log("Selected date:", selectedDate);
    console.log("Selected times:", Array.from(selectedTimes));
    // TODO: 저장 로직 구현
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <Header title="시간 등록/수정하기" backPath="/Schedule" showBorder={false} />
      
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24">
        {/* 날짜 선택 */}
        <div className="mb-6">
          <h2 className="text-base font-bold text-black1 mb-4">날짜 선택</h2>
          <div className="flex flex-col gap-2">
            {/* 요일 */}
            <div className="flex gap-2">
              {dates.map((date) => (
                <div key={date.fullDate} className="flex-1 text-center text-sm text-gray4">
                  {date.day}
                </div>
              ))}
            </div>
            {/* 날짜 */}
            <div className="flex gap-2">
              {dates.map((date) => (
                <button
                  key={date.fullDate}
                  type="button"
                  onClick={() => setSelectedDate(date.fullDate)}
                  className={`flex-1 h-10 rounded-lg text-base font-medium transition ${
                    selectedDate === date.fullDate
                      ? "bg-point text-white"
                      : "bg-white border border-gray1 text-black1"
                  }`}
                >
                  {date.date}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 시간 선택 */}
        <div className="mb-6">
          <h2 className="text-base font-bold text-black1 mb-4">시간 선택</h2>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((timeSlot) => {
              const timeKey = `${selectedDate}-${timeSlot.hour}-${timeSlot.minute}`;
              const isSelected = selectedTimes.has(timeKey);
              
              return (
                <button
                  key={`${timeSlot.hour}-${timeSlot.minute}`}
                  type="button"
                  onClick={() => handleTimeToggle(timeSlot.hour, timeSlot.minute)}
                  className={`
                    w-full h-10 rounded-lg text-base font-medium transition
                    ${
                      isSelected
                        ? "border-2 border-point text-point"
                        : "bg-white border border-gray1 text-black1"
                    }
                  `}
                  style={{ backgroundColor: isSelected ? "#FBFEFA" : "" }}
                >
                  {String(timeSlot.hour).padStart(2, "0")}:{String(timeSlot.minute).padStart(2, "0")}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-gray1 z-50 max-w-[390px] mx-auto">
        <button
          type="button"
          onClick={handleSave}
          className="w-full h-12 rounded-lg bg-point text-white text-base font-semibold hover:bg-[#4C6953] transition"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

