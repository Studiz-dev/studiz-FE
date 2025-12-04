import CalendarHeader from "./CalendarHeader";
import CalendarWeekdays from "./Weekdays";
import CalendarGrid from "./CalendarGrid";
import CalendarModal from "./CalendarModal";
import { useState } from "react";
import type { ScheduleForCalendar, GetDailySchedulesResponse, DailySchedule } from "../../types/calender"; // Import new types
import { getDailySchedules } from "../../services/calendar.service"; // Import new service
import { AxiosError } from "axios"; // Import AxiosError


interface CalendarProps {
  schedulesByDate: Record<string, ScheduleForCalendar[]>;
  onSelect: (date: Date) => void;
  currentYear: number;
  currentMonth: number; // Now 0-indexed
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
  studyId: string; // New prop for studyId
}

export default function Calendar({
  schedulesByDate,
  onSelect,
  currentYear,
  currentMonth,
  setCurrentMonth,
  setCurrentYear,
  studyId, // Accept studyId
}: CalendarProps ) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dailySchedules, setDailySchedules] = useState<DailySchedule[]>([]); // State for daily schedules
  const [dailySchedulesLoading, setDailySchedulesLoading] = useState(false); // Loading state for daily schedules
  const [dailySchedulesError, setDailySchedulesError] = useState<string | null>(null); // Error state for daily schedules

  const handlePrev = () => {
    if (currentMonth === 0) { // 0월 (January) -> 이전 해 11월 (December)
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) { // 11월 (December) -> 다음 해 0월 (January)
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    }
    else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
    onSelect(date); // Call parent's onSelect

    // Fetch daily schedules
    setDailySchedulesLoading(true);
    setDailySchedulesError(null);
    try {
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
      const response = await getDailySchedules(studyId, formattedDate);
      // Frontend should limit to 3 schedules
      setDailySchedules(response.schedules.slice(0, 3));
    } catch (error) {
      console.error("일별 일정 조회 실패:", error);
      if (error instanceof AxiosError) {
        setDailySchedulesError(error.response?.data?.message || "일별 일정을 불러오는 중 오류가 발생했습니다.");
      } else {
        setDailySchedulesError("일별 일정을 불러오는 중 알 수 없는 오류가 발생했습니다.");
      }
      setDailySchedules([]); // Clear schedules on error
    } finally {
      setDailySchedulesLoading(false);
    }
  };

  // No longer needed here as data is fetched on date select
  // const selectedKey = selectedDate
  //   ? selectedDate.toISOString().split("T")[0]
  //   : "";
  // const selectedSchedules = schedulesByDate[selectedKey] || []; // This now comes from dailySchedules

  return (
    <div className="w-full flex flex-col gap-2 border-b-[1.5px] border-main4">
      <CalendarHeader
        year={currentYear}
        month={currentMonth} // Pass 0-indexed month
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <CalendarWeekdays />
      <CalendarGrid
        year={currentYear}
        month={currentMonth} // Pass 0-indexed month
        schedulesByDate={schedulesByDate} // This is for day cell markers
        onSelect={handleDateSelect}
      />

      <CalendarModal
        open={modalOpen}
        date={selectedDate}
        schedules={dailySchedules} // Pass fetched daily schedules
        loading={dailySchedulesLoading} // Pass loading state
        error={dailySchedulesError} // Pass error state
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
