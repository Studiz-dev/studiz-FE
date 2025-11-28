import UpcomingSchedule from "../components/UpcomingSchedule";
import TodoList from "../components/TodoList";
import Header from "../components/Header";
import MemberHeader from "../components/MemberHeader";
import type { Member } from "../types/member";
import { dummyMembers } from "../mock/memberData";

export default function GroupHomePage() {
  const members: Member[] = dummyMembers;
  const currentMembers = members.length;   // 4
  const totalMembers = 6;
  return (
    <div className="bg-background flex flex-col">
      <Header title="스터디그룹명" backPath="/Group" />
      <MemberHeader members={members}
        currentMembers={currentMembers}
        totalMembers={totalMembers} />
      <div className="flex flex-col gap-4 px-4">
        <UpcomingSchedule />
        <TodoList />
      </div>
    </div>
  );
}
