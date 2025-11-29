import { dummySchedules } from "../mock/scheduleTodoData";
import UpcomingScheduleItem from "./UpcomingScheduleItem";
import { useNavigate } from "react-router-dom";
import Plus from "../assets/plus.svg?react";

export default function UpcomingSchedule() {
  const navigate = useNavigate();
  const isLeader = true;
  return (
    <section className="bg-white rounded-[20px] border-[1.5px] border-main3 pt-5 px-5 pb-2">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-bold mb-2 text-black1">다가오는 일정</h1>
        {isLeader && (<button onClick={() => navigate("/CreateSchedule")} className="px-2 py-1 bg-main4 rounded-[12px] items-center flex gap-1">
          <Plus className="text-point" />
          <span className="text-point text-[14px] font-medium ">새로운 일정</span>
        </button>)}
      </div>

      {dummySchedules.map((item, index) => (
        <UpcomingScheduleItem key={item.id} item={item}
          isLast={index === dummySchedules.length - 1}
        />
      ))}
    </section>
  );
}
