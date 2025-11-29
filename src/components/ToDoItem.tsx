import CheckBox from "../assets/CheckBox.svg?react";
import { useNavigate } from "react-router-dom";

interface TodoItemProps {
    taskName: string;
    completedCount: number;
    totalCount: number;
    isChecked: boolean;
    isLast: boolean;
    path: string;
}

export default function TodoItem({ taskName, completedCount, totalCount, isChecked, isLast, path, }: TodoItemProps) {
    const progress = (completedCount / totalCount) * 100;
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(path)} className={`flex-col w-full pt-3 pb-3 gap-2 ${!isLast ? "border-b-[1.5px] border-main4" : ""}`}>
            <div className="flex items-center mb-2 items-start gap-2">
                <CheckBox className={`w-6 h-6 ${isChecked ? "text-point" : "text-main3"}`} />
                <span className="text-[16px] font-medium text-black1">{taskName}</span>
            </div>
            <div className="flex w-full gap-2 items-center h-5">
                <span className="text-[14px] font-semibold text-point whitespace-nowrap">진행률 {Math.round(progress)}%</span>
                 <div className="w-full h-[4px] bg-main2 overflow-hidden">
                    <div className="h-full bg-point" style={{ width: `${progress}%` }}></div>
                 </div>
            </div>
        </button>
    )
}