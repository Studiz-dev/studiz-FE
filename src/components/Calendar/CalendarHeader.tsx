import Right from "../../assets/calendarR.svg?react";

type CalendarHeaderProps = {
  year: number;
  month: number; // 0~11
  onPrev: () => void;
  onNext: () => void;
};

export default function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
}: CalendarHeaderProps) {
  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월",
  ];

  return (
    <div className="flex items-center justify-center mb-2 pt-4 px-4">
      {/* 왼쪽 버튼 */}
      <button onClick={onPrev} className="p-2 mr-2"> 
        <Right className="w-4 h-4 rotate-180" />
      </button>

      {/* 제목 */}
      <span className="text-black1 text-[18px] font-semibold mx-2">
        {year}년 {monthNames[month]}
      </span>

      {/* 오른쪽 버튼 */}
      <button onClick={onNext} className="p-2 ml-2">
        <Right className="w-4 h-4" />
      </button>
    </div>
  );
}
