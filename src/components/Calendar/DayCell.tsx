export type CalendarSchedule = {
    id: string;
    title: string;
};

export type DayCellProps = {
    date: Date;
    schedules: CalendarSchedule[];
    isCurrentMonth?: boolean;
    onSelect: (date: Date) => void;
};

export default function DayCell({
    date,
    schedules,
    isCurrentMonth = true,
    onSelect,
}: DayCellProps) {
    const day = date.getDate();

    const EVENT_COLORS = [
        { bg: "#FADEDE", bar: "#E55B5B" },
        { bg: "#DEE7FA", bar: "#3D62D6" },
        { bg: "#EADAFF", bar: "#8A2BD6" },
    ];

    return (
        <button
            onClick={() => onSelect(date)}
            className="w-[50px] h-[58px] px-[1px] flex flex-col transition"
        >
            {/* 날짜 */}
            <span
                className={`text-[14px] font-medium ${
                    isCurrentMonth ? "text-black1" : "text-gray2"
                }`}
            >
                {day}
            </span>

            {/* 일정 리스트 */}
            <div className="flex flex-col gap-[2px]">
                {schedules.slice(0, 3).map((s, i) => {
                    const color = EVENT_COLORS[i % EVENT_COLORS.length];

                    // 제목 6자 처리 + 말줄임
                    const displayTitle =
                        s.title.length <= 6 ? s.title : s.title.slice(0, 4) + "...";

                    return (
                        <div
                            key={s.id}
                            className="flex w-full items-center text-[8px] font-regular truncate rounded-r-[2px] rounded-l-none"
                            style={{
                                backgroundColor: color.bg,
                                color: isCurrentMonth ? "#000" : "#C4C4C4",
                                borderTopLeftRadius: "0px",      // 좌측 라운딩 제거
                                borderBottomLeftRadius: "0px",   // 좌측 라운딩 제거
                            }}
                        >
                            {/* 왼쪽 두꺼운 색상바 */}
                            <div
                                style={{
                                    width: "2px",
                                    height: "100%",
                                    backgroundColor: color.bar,
                                    marginRight: "2px",
                                    borderTopLeftRadius: "0px",
                                    borderBottomLeftRadius: "0px",
                                }}
                            />

                            {/* 제목 */}
                            <span className="truncate">{displayTitle}</span>
                        </div>
                    );
                })}
            </div>
        </button>
    );
}
