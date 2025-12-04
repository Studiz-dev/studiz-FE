import UpcomingScheduleItem from "./UpcomingScheduleItem";
// import { dummySchedules } from "../mock/scheduleTodoData"; // Remove mock data import
import { useNavigate } from "react-router-dom";
import Plus from "../assets/plus.svg?react";
import type { ScheduleItem } from "../types/schedule"; // Import ScheduleItem type

interface UpcomingScheduleProps {
  isLeader: boolean;
  studyId?: string;
  schedules: ScheduleItem[]; // Accept schedules as prop
}

export default function UpcomingSchedule({ isLeader, studyId, schedules }: UpcomingScheduleProps) { // Destructure schedules from props
  const navigate = useNavigate();

  // If no schedules, display a message
  if (schedules.length === 0) {
    return (
      <section className="bg-white rounded-[20px] border-[1.5px] border-main3 pt-5 px-5 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[18px] font-bold mb-2 text-black1">다가오는 일정</h1>
          {isLeader && (<button onClick={() => navigate("/CreateSchedule", { state: { studyId } })} className="px-2 py-1 bg-main4 rounded-[12px] items-center flex gap-1">
            <Plus className="text-point" />
            <span className="text-point text-[14px] font-medium ">새로운 일정</span>
          </button>)}
        </div>
        <p className="text-gray-500 text-center py-4">아직 일정이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-[20px] border-[1.5px] border-main3 pt-5 px-5 pb-2">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-bold mb-2 text-black1">다가오는 일정</h1>
        {isLeader && (<button onClick={() => navigate("/CreateSchedule", { state: { studyId } })} className="px-2 py-1 bg-main4 rounded-[12px] items-center flex gap-1">
          <Plus className="text-point" />
          <span className="text-point text-[14px] font-medium ">새로운 일정</span>
        </button>)}
      </div>

      {schedules.map((item, index) => ( // Use schedules prop instead of dummySchedules mock data
        <UpcomingScheduleItem key={item.id} item={{
            ...item,
            scheduleName: item.title, // Map title to scheduleName
            dateTime: item.scheduleTime || "", // Map scheduleTime to dateTime, handle undefined
        }}
          isLast={index === schedules.length - 1}
        />
      ))}
    </section>
  );
}
