import Crown from "../assets/crown.svg?react";
import Dots from "../assets/dots.svg?react";
import type { Member } from "../types/member";

interface MemberInfoProps {
    member: Member;
}

export default function MemberInfo({ member }: MemberInfoProps) {
    const { name, isLeader, profileImage } = member;
    return (
        <div className="flex items-center justify-between px-6 h-16 bg-white border-b-[1.5px] border-main4">
            <div className="flex items-center gap-4">
                {profileImage ? (
                    <img src={profileImage} alt={name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />)
                    : (<div className="w-10 h-10 rounded-full bg-gray2 flex-shrink-0" />)
                }
                <div className="flex items-center gap-1">
                    {isLeader && <Crown className="w-5 h-5" />}
                    <span className="text-[16px] font-medium text-black1">{name}</span>
                </div>
            </div>
            <button className="p-2">
                <Dots className="w-6 h-6" />
            </button>
        </div>
    );
}