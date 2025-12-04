import { useState, useEffect } from "react";
import MyInfo from "../components/MyInfo";
import TodoList from "../components/TodoList";
import Calendar from "../components/Calendar/Calendar";
import { getTodosByStudy } from "../services/todo.service"; // Import todo service
import type { GetTodosResponse, TodoGroup } from "../types/todo"; // Import todo types
import { getCalendarSummary } from "../services/calendar.service"; // Import calendar service
import type { GetCalendarSummaryResponse, ScheduleForCalendar } from "../types/calender"; // Import calendar types
import { AxiosError } from "axios"; // Import AxiosError for error handling


export default function HomePage() {
  const [todos, setTodos] = useState<GetTodosResponse>([]);
  const [groupedTodos, setGroupedTodos] = useState<TodoGroup[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [todosError, setTodosError] = useState<string | null>(null);

  const [calendarSchedulesByDate, setCalendarSchedulesByDate] = useState<Record<string, ScheduleForCalendar[]>>({});
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  // For calendar month navigation
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // Month is 0-indexed

  // Temporary hardcoded studyId for HomePage
  const tempStudyId = "mock-study-id-for-homepage"; // Use a UUID here in a real app

  useEffect(() => {
    const fetchTodos = async () => {
      setTodosLoading(true);
      setTodosError(null);
      try {
        const fetchedTodos = await getTodosByStudy(tempStudyId);
        setTodos(fetchedTodos);

        // Group fetchedTodos by groupName, similar to GroupHomePage
        const grouped: { [key: string]: TodoGroup } = {};
        fetchedTodos.forEach(todoItem => {
          if (!grouped[todoItem.groupName]) {
            grouped[todoItem.groupName] = {
              id: todoItem.groupId,
              groupName: todoItem.groupName,
              todos: [],
            };
          }
          grouped[todoItem.groupName].todos.push({
            id: todoItem.id,
            name: todoItem.name,
            description: todoItem.description,
            dueDate: todoItem.dueDate,
            certificationMethods: todoItem.certificationMethods,
            isCompleted: todoItem.isCompleted,
            completedParticipants: todoItem.completedParticipants,
            totalParticipants: todoItem.totalParticipants,
            taskName: todoItem.name,
            completedCount: todoItem.completedParticipants,
            totalCount: todoItem.totalParticipants,
            isChecked: todoItem.isCompleted,
          });
        });
        setGroupedTodos(Object.values(grouped));

      } catch (error) {
        console.error("HomePage To-Do 목록 조회 실패:", error);
        if (error instanceof AxiosError) {
          setTodosError(error.response?.data?.message || "To-Do 목록을 불러오는 중 오류가 발생했습니다.");
        } else {
          setTodosError("To-Do 목록을 불러오는 중 알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setTodosLoading(false);
      }
    };

    const fetchCalendarData = async () => {
      setCalendarLoading(true);
      setCalendarError(null);
      try {
        const calendarSummary = await getCalendarSummary(tempStudyId, currentYear, currentMonth + 1); // API expects 1-indexed month
        const transformedSchedules: Record<string, ScheduleForCalendar[]> = {};
        calendarSummary.days.forEach(daySummary => {
          transformedSchedules[daySummary.date] = daySummary.scheduleTitles.map((title, index) => ({
            id: `${daySummary.date}-${index}`, // Generate synthetic ID for key prop
            title: title
          }));
        });
        setCalendarSchedulesByDate(transformedSchedules);
      } catch (error) {
        console.error("HomePage 달력 데이터 조회 실패:", error);
        if (error instanceof AxiosError) {
          setCalendarError(error.response?.data?.message || "달력 데이터를 불러오는 중 오류가 발생했습니다.");
        } else {
          setCalendarError("달력 데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setCalendarLoading(false);
      }
    };

    fetchTodos();
    fetchCalendarData();
  }, [currentYear, currentMonth]); // Depend on currentYear and currentMonth for calendar data

  if (todosLoading || calendarLoading) {
    return (
      <div className="bg-background flex flex-col items-center justify-center h-full">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (todosError || calendarError) {
    return (
      <div className="bg-background flex flex-col items-center justify-center h-full">
        <p className="text-red-500 text-center px-4">{todosError || calendarError}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white pb-5">

      {/* 🔥 MyInfo + Calendar (좌우 패딩 없음, 간격 없음) */}
      <div className="flex flex-col">
        <MyInfo />
        <Calendar
          schedulesByDate={calendarSchedulesByDate}
          onSelect={(date) => console.log("선택된 날짜:", date)}
          currentYear={currentYear}
          currentMonth={currentMonth} // Pass 0-indexed month
          setCurrentMonth={setCurrentMonth}
          setCurrentYear={setCurrentYear}
          studyId={tempStudyId} // Pass tempStudyId to Calendar
        />
      </div>

      {/* 🔥 UpcomingSchedule + TodoList (위쪽 12px, 좌우 16px 패딩) */}
      <div className="px-4 mt-4">
        {/* Pass fetched groupedTodos to TodoList */}
        <TodoList isLeader={false} studyId={tempStudyId} todos={groupedTodos} />
      </div>

    </div>
  );
}
