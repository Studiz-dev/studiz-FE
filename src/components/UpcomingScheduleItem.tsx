import type { ScheduleItem } from "../types/schedule";

interface UpcomingScheduleItemProps {
    item: ScheduleItem;
    isLast: boolean;
}

export default function UpcomingScheduleItem({ item, isLast }: UpcomingScheduleItemProps) {
    return (
        <div className={`flex items-center justify-between h-[90px] w-full  ${!isLast ? "border-b-[1.5px] border-main4" : ""}`}>
            <div className="flex flex-col items-start">
                <span className="text-[14px] font-semibold text-point">{item.location}</span>
                <span className="text-[18px] font-semibold text-black1 mb-[2px]">{item.scheduleName}</span>
                <span className="text-[14px] font-medium text-gray4">{item.dateTime}</span>
            </div>
            <span className="inline-flex justify-center w-[56px] text-[18px] font-semibold text-point">
                {item.dDay === 0 ? "D-DAY" : `D-${item.dDay}`}
            </span>
        </div>
    )
}