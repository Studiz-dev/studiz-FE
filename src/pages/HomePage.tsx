import MyInfo from "../components/MyInfo";
import TodoList from "../components/TodoList";
import Calendar from "../components/Calendar/Calendar";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white pb-5">

      {/* 🔥 MyInfo + Calendar (좌우 패딩 없음, 간격 없음) */}
      <div className="flex flex-col">
        <MyInfo />
        <Calendar
          schedulesByDate={{
            "2025-09-08": [
              { id: "1", title: "시프 과제" },
              { id: "2", title: "개강" },
              { id: "3", title: "다죽자" },
            ],
            "2025-09-15": [{ id: "4", title: "조별과제 회의" }],
            "2025-09-22": [{ id: "5", title: "진탐" }],
            "2025-09-29": [
              { id: "6", title: "개강" },
              { id: "7", title: "개강" },
              { id: "8", title: "개강" },
            ],
            "2025-09-30": [
              { id: "9", title: "과제 제출" },
              { id: "10", title: "프로젝트 리뷰" },
            ],
          }}
          onSelect={(date) => console.log("선택된 날짜:", date)}
        />
      </div>

      {/* 🔥 UpcomingSchedule + TodoList (위쪽 12px, 좌우 16px 패딩) */}
      <div className="px-4 mt-4">
        <TodoList />
      </div>

    </div>
  );
}
