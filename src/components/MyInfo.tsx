import Setting from "../assets/setting.svg?react";
import Pen from "../assets/pen.svg?react";
import { dummyMembers } from "../mock/memberData";

export default function MyInfoBar() {
    const user = dummyMembers[0];
    return (
        <div className="w-full flex bg-white items-center justify-between h-[90px] px-6 border-b-[1.5px] border-main4">
            <div className="flex items-center gap-3">

                <div className="w-[48px] h-[48px] rounded-full bg-gray2 border-2 border-main1"></div>
                <div className="flex items-center gap-2">
                    <span className="text-[16px] font-medium text-black1">
                        {user.name}님
                    </span>
                    <Pen className="w-4 h-4 text-main2" />
                </div>
            </div>

            <Setting className="w-5 h-5 text-main1" />
        </div>
    );
}
