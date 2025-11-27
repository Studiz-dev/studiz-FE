import Header from "../components/Header";
import MemberInfo from "../components/MemberInfo";

import { dummyMembers } from "../mock/memberData";
import type { Member } from "../types/member";

export default function MemberPage() {
    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="스터디 멤버" backPath="/Home" />
            <div className="flex-1 overflow-y-auto">
                {dummyMembers.map((member: Member) => (
                    <MemberInfo key={member.id} member={member} />))
                }
            </div>
        </div>
    )
}