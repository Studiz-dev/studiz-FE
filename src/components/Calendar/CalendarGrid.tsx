import DayCell from "./DayCell";

export type CalendarGridProps = {
  year: number;           
  month: number;          
  schedulesByDate: Record<string, { id: string; title: string }[]>;
  onSelect: (date: Date) => void;
};

function generateCalendarMatrix(year: number, month: number): Date[] {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  const firstDay = firstDate.getDay();         // 이번 달 첫날 요일
  const daysInMonth = lastDate.getDate();      // 이번 달 총 날짜 수

  const dates: Date[] = [];

  /** (1) 이번달 시작 이전 날짜 채우기 */
  for (let i = 0; i < firstDay; i++) {
    dates.push(new Date(year, month, i - firstDay + 1));
  }

  /** (2) 이번달 날짜 채우기 */
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month, i));
  }

  /** (3) 마지막 날짜 이후 필요한 만큼 채우기 (7의 배수 맞출 때까지) */
  while (dates.length % 7 !== 0) {
    const nextIndex = dates.length - (firstDay + daysInMonth) + 1;
    dates.push(new Date(year, month + 1, nextIndex));
  }

  return dates;
}


export default function CalendarGrid({
  year,
  month,
  schedulesByDate,
  onSelect,
}: CalendarGridProps) {
  const dates = generateCalendarMatrix(year, month);

  return (
    <div className="grid grid-cols-7 px-2 gap-[6px]">
      {dates.map((date: Date) => {
        const key = date.toISOString().split("T")[0];
        const isCurrentMonth = date.getMonth() === month;
        const schedules = schedulesByDate[key] ?? [];

        return (
          <DayCell
            key={key}
            date={date}
            schedules={schedules}
            isCurrentMonth={isCurrentMonth}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}
