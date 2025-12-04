import { useLocation } from "react-router-dom"; // useLocation 임포트
import Header from "../components/Header";
import MemberInfo from "../components/MemberInfo";

// import { dummyMembers } from "../mock/memberData"; // 더미 데이터 더 이상 필요 없음
import type { Member } from "../types/member";

export default function MemberPage() {
    const location = useLocation();
    const members: Member[] | undefined = location.state?.members;

    if (!members || members.length === 0) {
        return (
            <div className="flex flex-col h-full bg-background items-center justify-center">
                <p className="text-gray-500">멤버 정보를 불러올 수 없습니다.</p>
                <Header title="스터디 멤버" backPath="/GroupHome" /> {/* 헤더는 계속 표시 */}
            </div>
        );
    }

    // 스터디장을 맨 위로 오도록 정렬
    const sortedMembers = [...members].sort((a, b) => {
        if (a.isLeader && !b.isLeader) return -1; // a가 리더, b가 리더 아님 -> a가 먼저
        if (!a.isLeader && b.isLeader) return 1;  // a가 리더 아님, b가 리더 -> b가 먼저
        return 0; // 둘 다 리더이거나 둘 다 리더 아님 -> 순서 유지
    });

    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="스터디 멤버" backPath="/GroupHome" />
            <div className="flex-1 overflow-y-auto">
                {sortedMembers.map((member: Member) => (
                    <MemberInfo key={member.id} member={member} />))
                }
            </div>
        </div>
    )
}