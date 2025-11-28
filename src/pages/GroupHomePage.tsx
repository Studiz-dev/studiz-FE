import UpcomingSchedule from "../components/UpcomingSchedule";
import TodoList from "../components/TodoList";
import Header from "../components/Header";
import MemberHeader from "../components/MemberHeader";
import Scheduling from "../components/Scheduling";
import type { Member } from "../types/member";
import { dummyMembers } from "../mock/memberData";

export default function GroupHomePage() {
  const members: Member[] = dummyMembers;
  const currentMembers = members.length;
  const totalMembers = 6;
  const hasCurrentScheduling = true;

  return (
    <div className="bg-background flex flex-col pb-5">
      <Header title="스터디그룹명" backPath="/Group" />
      <MemberHeader members={members}
        currentMembers={currentMembers}
        totalMembers={totalMembers} />
      <div className="flex flex-col gap-3 px-4">
        {hasCurrentScheduling && (<Scheduling title={"시프 공부하기"} />)}
        <UpcomingSchedule />
        <TodoList />
      </div>
    </div>
  );
}
