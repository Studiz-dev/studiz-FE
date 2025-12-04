import NumberInputBox from './NumberInputBox';
import React from 'react'; // Import React for React.ChangeEvent

interface DeadlineSelectorProps {
    month: number | string;
    setMonth: React.Dispatch<React.SetStateAction<number | string>>;
    day: number | string;
    setDay: React.Dispatch<React.SetStateAction<number | string>>;
    hour: number | string;
    setHour: React.Dispatch<React.SetStateAction<number | string>>;
    minute: number | string;
    setMinute: React.Dispatch<React.SetStateAction<number | string>>;
}

export default function DeadlineSelector({
    month, setMonth,
    day, setDay,
    hour, setHour,
    minute, setMinute,
}: DeadlineSelectorProps) {

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMonth(e.target.value);
    };
    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDay(e.target.value);
    };
    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHour(e.target.value);
    };
    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinute(e.target.value);
    };

    return (
        <div className="flex flex-col gap-3 px-4 pt-5">
            <label className="text-[16px] font-semibold text-black1">
                완료 기한
            </label>
            <div className="flex items-center pb-4 border-b-[1.5px] border-main4 gap-2 text-[14px] font-medium text-black1">
                <NumberInputBox value={month} onChange={handleMonthChange} />
                <span>월</span>
                <NumberInputBox value={day} onChange={handleDayChange} />
                <span>일</span>
                <div className="w-1" />
                <div className="flex items-center gap-[12.5px]">
                    <NumberInputBox value={hour} onChange={handleHourChange} />
                    <span>:</span>
                    <NumberInputBox value={minute} onChange={handleMinuteChange} />
                </div>
                <span>까지</span>
            </div>
        </div>
    );
}