import Header from "../components/Header";
import MemberInfo from "../components/MemberInfo";

const members = [
    {
        id: 1,
        name: "사용자1",
        isLeader: true
    },
    {
        id: 2,
        name: "사용자2",
        isLeader: false
    },
    {
        id: 3,
        name: "사용자3",
        isLeader: false
    },
    {
        id: 4,
        name: "사용자4",
        isLeader: false
    },
];
export default function MemberPage() {
    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="스터디 멤버" backPath="/Home" />
            <div className="flex-1 overflow-y-auto">
                {members.map((member) => (
                    <MemberInfo key={member.id} name={member.name} isLeader={member.isLeader} />))
                }
            </div>
        </div>
    )
}