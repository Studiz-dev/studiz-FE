import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { mockScheduleData } from "../mock/scheduleData";

export default function ScheduleEditPage() {
  const navigate = useNavigate();
  
  // mock 데이터에서 날짜와 시간 범위 가져오기
  const dates = mockScheduleData.dates.map((dateStr) => {
    const parts = dateStr.split(" ");
    const dateNum = parts[0].split("/")[1]; // "9/1"에서 "1" 추출
    const day = parts[1]; // "월"
    return {
      day,
      date: dateNum,
      fullDate: dateStr,
    };
  });
  
  const [selectedDate, setSelectedDate] = useState(dates[0]?.fullDate || ""); // 기본 선택 날짜
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());
  
  // 방장이 설정한 시간 범위 내의 시간 슬롯만 생성
  const timeSlots = [];
  const { startHour, endHour } = mockScheduleData.timeRange;
  for (let hour = startHour; hour <= endHour; hour++) {
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
    navigate("/Schedule"); // 스케줄 페이지로 이동
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <Header title="시간 등록/수정하기" backPath="/Schedule"/>
      
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24">
        {/* 날짜 선택 */}
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-black1 mb-4">날짜 선택</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-2 justify-center min-w-max">
              {dates.map((date) => {
                // 해당 날짜에 선택된 시간이 있는지 확인
                const hasSelectedTimes = Array.from(selectedTimes).some(timeKey => 
                  timeKey.startsWith(`${date.fullDate}-`)
                );
                const isSelected = selectedDate === date.fullDate;
                
                return (
                  <div key={date.fullDate} className="flex flex-col items-center gap-2" style={{ minWidth: '50px' }}>
                    {/* 요일 */}
                    <div className="text-center text-[14px] text-gray3">
                      {date.day}
                    </div>
                    {/* 날짜 */}
                    <button
                      type="button"
                      onClick={() => setSelectedDate(date.fullDate)}
                      className={`aspect-square text-[14px] font-normal transition rounded-[10px] ${
                        isSelected
                          ? "bg-point text-white"
                          : hasSelectedTimes
                          ? "bg-point/20  text-black1"
                          : "text-black1"
                      }`}
                      style={{ width: '50px', height: '50px' }}
                    >
                      {date.date}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* 시간 선택 */}
        <div className="mb-6">
          <h2 className="text-[18px] font-semibold text-black1 mb-4">시간 선택</h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-4">
              {timeSlots.map((timeSlot) => {
                const timeKey = `${selectedDate}-${timeSlot.hour}-${timeSlot.minute}`;
                const isSelected = selectedTimes.has(timeKey);
                
                return (
                  <button
                    key={`${timeSlot.hour}-${timeSlot.minute}`}
                    type="button"
                    onClick={() => handleTimeToggle(timeSlot.hour, timeSlot.minute)}
                    className={`
                      w-[70px] h-10 rounded-lg text-[14px] font-normal transition
                      ${
                        isSelected
                          ? "border-2 border-point font-semibold text-point"
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
      </div>
      
      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 z-50 max-w-[390px] mx-auto">
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

