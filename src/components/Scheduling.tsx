import { useNavigate } from "react-router-dom";
import Right from "../assets/right.svg?react";
interface SchedulingProps {
    title: string;
}

export default function Scheduling({ title }: SchedulingProps) {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/GroupHome")} className="flex items-center px-5 w-full h-[85px] bg-white rounded-[15px] border-[1.5px] border-main1 justify-between px-4">
            <div className="flex flex-col items-start gap-[2px]">
                <span className="text-[14px] font-semibold text-point">현재 조율중인 일정</span>
                <span className="text-[18px] font-semibold text-black1"> {title} </span>
            </div>
            <div className="text-[14px] text-point font-semibold flex items-center">
                바로가기
                <Right />
            </div>
        </button>
    )
}