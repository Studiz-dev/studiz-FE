import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarWeekdays from "./Weekdays";
import CalendarGrid from "./CalendarGrid";
import CalendarModal from "./CalendarModal";

type CalendarProps = {
  schedulesByDate: Record<string, { id: string; title: string }[]>;
  onSelect?: (date: Date) => void;
};

export default function Calendar({ schedulesByDate, onSelect = () => {} }: CalendarProps ) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePrev = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
    onSelect(date);
  };

  // 일정 불러오기
  const selectedKey = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : "";
  const selectedSchedules = schedulesByDate[selectedKey] || [];

  return (
    <div className="w-full flex flex-col gap-2 border-b-[1.5px] border-main4">
      <CalendarHeader year={year} month={month} onPrev={handlePrev} onNext={handleNext} />
      <CalendarWeekdays />
      <CalendarGrid year={year} month={month} schedulesByDate={schedulesByDate} onSelect={handleDateSelect} />

      <CalendarModal
        open={modalOpen}
        date={selectedDate}
        schedules={selectedSchedules}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
