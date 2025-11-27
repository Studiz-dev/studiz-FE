import MemberCheckInfo from "./MemberCheckInfo";
import type { SelectableMember } from "../../types/member";

interface SelectMemberProps {
    members: SelectableMember[];
    onToggle: (id: number) => void;
}

export default function SelectMember({ members, onToggle }: SelectMemberProps) {
    return (
        <div className="flex flex-col px-4 pt-5 gap-3 ">
            <label className="text-[16px] font-semibold text-black1">
                참여 멤버
            </label>
            <div className="flex flex-col pb-4 border-b-[1.5px] border-main4">
                {members.map((member) => (
                    <MemberCheckInfo key={member.id} member={member} onToggle={onToggle} />
                ))}
            </div>
        </div>
    );
}