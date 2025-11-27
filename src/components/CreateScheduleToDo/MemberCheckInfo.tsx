import CheckBox from "../../assets/CheckBox.svg?react";
import type { SelectableMember } from "../../types/member";

interface MemberCheckInfoProps {
    member: SelectableMember;
    onToggle: (id: number) => void; // 클릭 시 토글하라고 전달
}

export default function MemberCheckInfo({ member, onToggle }: MemberCheckInfoProps) {
    const { id, name, profileImage, checked } = member;

    const handleClick = () => {
        onToggle(id);
    }
    return (
        <div className="flex items-center justify-between h-10 bg-white">
            <div className="flex items-center gap-2">
                {profileImage ? (
                    <img src={profileImage} alt={name} className="w-[32px] h-[32px] rounded-full object-cover flex-shrink-0" />)
                    : (<div className="w-8 h-8 rounded-full bg-gray2 flex-shrink-0" />)
                }
                <span className="text-[14px] font-medium text-black1">{name}</span>
            </div>
            <button type="button" className="p-2" onClick={handleClick}>
                <CheckBox className={`w-6 h-6 cursor-pointer ${checked ? "text-point" : "text-main3"}`} />
            </button>
        </div>
    );
}