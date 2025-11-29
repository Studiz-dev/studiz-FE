import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScheduleEditPage() {
  const navigate = useNavigate();
  
  // 날짜 데이터 (9/1 월 ~ 9/5 금)
  const dates = [
    { day: "월", date: "1", fullDate: "9/1 월" },
    { day: "화", date: "2", fullDate: "9/2 화" },
    { day: "수", date: "3", fullDate: "9/3 수" },
    { day: "목", date: "4", fullDate: "9/4 목" },
    { day: "금", date: "5", fullDate: "9/5 금" },
  ];
  
  // 시간 슬롯 (0시부터 23시까지)
  const timeSlots = [];
  for (let hour = 0; hour <= 23; hour++) {
    timeSlots.push({ hour, minute: 0 });
  }
  
  const [selectedDate, setSelectedDate] = useState("9/4 목"); // 기본 선택 날짜
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());
  
  // 시간 토글
  const toggleTime = (date: string, hour: number, minute: number) => {
    const timeKey = `${date}-${hour}-${minute}`;
    const newSelected = new Set(selectedTimes);
    
    if (newSelected.has(timeKey)) {
      newSelected.delete(timeKey);
    } else {
      newSelected.add(timeKey);
    }
    
    setSelectedTimes(newSelected);
  };
  
  // 선택된 시간인지 확인
  const isTimeSelected = (date: string, hour: number, minute: number) => {
    return selectedTimes.has(`${date}-${hour}-${minute}`);
  };
  
  // 저장하기
  const handleSave = () => {
    console.log("Selected date:", selectedDate);
    console.log("Selected times:", Array.from(selectedTimes));
    // TODO: 저장 로직 구현
    navigate(-1); // 이전 페이지로 돌아가기
  };
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* 헤더 */}
      <div className="relative flex items-center justify-center h-[60px] bg-white border-b-[1.5px] border-main4 px-4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-2 p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-black1">시간 등록/수정하기</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24">
        {/* 날짜 선택 */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-black1 mb-4">날짜 선택</h2>
          <div className="flex flex-col gap-3">
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
              const timeStr = `${String(timeSlot.hour).padStart(2, "0")}:${String(timeSlot.minute).padStart(2, "0")}`;
              const isSelected = isTimeSelected(selectedDate, timeSlot.hour, timeSlot.minute);
              
              return (
                <button
                  key={`${timeSlot.hour}-${timeSlot.minute}`}
                  type="button"
                  onClick={() => toggleTime(selectedDate, timeSlot.hour, timeSlot.minute)}
                  className={`h-12 rounded-lg text-sm font-medium transition ${
                    isSelected
                      ? "border-2 border-point text-point"
                      : "bg-white border border-gray1 text-black1"
                  }`}
                  style={isSelected ? { backgroundColor: "#FBFEFA" } : {}}
                >
                  {timeStr}
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

