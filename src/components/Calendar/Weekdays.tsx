export default function CalendarWeekdays() {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    // 🔥 CalendarGrid와 동일: px-2 + gap-[6px]
    <div className="grid grid-cols-7 gap-[6px] px-2 mb-1">
      {weekdays.map((day, idx) => {
        const color =
          idx === 0
            ? "#E57373" // 일요일
            : idx === 6
            ? "#64B5F6" // 토요일
            : "#7E7E7E";// 평일

        return (
          <div
            key={idx}
            className="flex w-[50px] justify-center text-[12px] font-medium"
            style={{ color }}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
