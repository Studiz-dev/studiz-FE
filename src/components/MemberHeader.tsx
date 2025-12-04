import type { Member } from "../types/member";
import Right from "../assets/right.svg?react";

interface MemberHeaderProps {
    members: Member[];               // 전체 멤버 리스트
    currentMembers: number;          // 현재 인원
    totalMembers: number;            // 전체 인원
    onViewAllClick: () => void;      // "전체보기" 클릭 시 호출될 콜백 함수
}

export default function MemberHeader({
    members,
    currentMembers,
    totalMembers,
    onViewAllClick,
}: MemberHeaderProps) {
    const displayMembers = members.slice(0, 3);

    return (
        <div className="w-full h-[60px] flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
                <div className="flex -space-x-[15px]">
                    {displayMembers.map((m, idx) => (
                        m.profileImage ? (
                            <img key={idx} src={m.profileImage} className="w-[30px] h-[30px] rounded-full object-cover" />
                        ) : (<div key={idx} className="w-[30px] h-[30px] rounded-full bg-gray2" />
                        )
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[14px] font-regular text-black1">
                        현재 인원
                    </span>
                    <span className="text-[14px] font-medium text-point">{currentMembers}/{totalMembers}명</span>
                </div>
            </div>
            <button
                onClick={onViewAllClick} className="text-[14px] text-point font-medium flex items-center">
                전체보기
                <Right />
            </button>
        </div>
    );
}
