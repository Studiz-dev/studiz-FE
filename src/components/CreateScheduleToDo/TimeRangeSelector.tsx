import NumberInputBox from './NumberInputBox';

export default function TimeRangeSelector() {
    return (
        <div className="flex flex-col gap-3 px-4 pt-5">
            <label className="text-[16px] font-semibold text-black1">
                시간 선택
            </label>
            <div className="flex items-center pb-4 border-b-[1.5px] border-main4">
                <div className="flex items-center gap-[12.5px] text-[14px] font-medium text-black1">
                    <NumberInputBox />
                    <span>:</span>
                    <NumberInputBox />
                </div>
                <div className="flex items-center justify-center w-[41px] text-[14px] font-medium text-black1">
                    ~
                </div>
                <div className="flex items-center gap-[12.5px] text-[14px] font-medium text-black1">
                    <NumberInputBox />
                    <span>:</span>
                    <NumberInputBox />
                </div>
            </div>
        </div>
    );
}