import NumberInputBox from './NumberInputBox';

export default function DeadlineSelector() {
    return (
        <div className="flex flex-col gap-3 px-4 pt-5">
            <label className="text-[16px] font-semibold text-black1">
                완료 기한
            </label>
            <div className="flex items-center pb-4 border-b-[1.5px] border-main4 gap-2 text-[14px] font-medium text-black1">
                <NumberInputBox />
                <span>월</span>
                <NumberInputBox />
                <span>일</span>
                <div className="w-1" />
                <div className="flex items-center gap-[12.5px]">
                    <NumberInputBox />
                    <span>:</span>
                    <NumberInputBox />
                </div>
                <span>까지</span>
            </div>
        </div>
    );
}