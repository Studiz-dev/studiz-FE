import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import UpcomingSchedule from "../components/UpcomingSchedule";
import TodoList from "../components/TodoList";
import Header from "../components/Header";
import MemberHeader from "../components/MemberHeader";
import Scheduling from "../components/Scheduling";
import type { Member } from "../types/member";
import { getStudyDetail } from "../services/study.service";
import type { StudyMember } from "../types/group";
import { getTodosByStudy } from "../services/todo.service";
import type { GetTodosResponse, TodoGroup } from "../types/todo";
import { getSchedulesByStudy } from "../services/schedule.service"; // Import the new service
import type { ScheduleItem, GetSchedulesResponse } from "../types/schedule"; // Import the new type and ScheduleItem


export default function GroupHomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const studyId = location.state?.studyId as string | undefined;

  const [studyName, setStudyName] = useState("스터디그룹명");
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const hasCurrentScheduling = true;

  const [todos, setTodos] = useState<GetTodosResponse>([]);
  const [groupedTodos, setGroupedTodos] = useState<TodoGroup[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [todosError, setTodosError] = useState<string | null>(null);

  const [schedules, setSchedules] = useState<GetSchedulesResponse>([]); // State for schedules
  const [schedulesLoading, setSchedulesLoading] = useState(true); // Loading state for schedules
  const [schedulesError, setSchedulesError] = useState<string | null>(null); // Error state for schedules


  const isLeader = members.some(member => member.isLeader);

  useEffect(() => {
    // studyId가 없으면 그룹 페이지로 리다이렉트
    if (!studyId) {
      navigate("/Group", { replace: true });
      return;
    }

    // 스터디 상세 정보 조회
    const fetchStudyDetail = async () => {
      setIsLoading(true);
      setError("");

      try {
        const studyDetail = await getStudyDetail(studyId);

        // 스터디 이름 설정
        setStudyName(studyDetail.name);

        // 멤버 목록 변환 (StudyMember -> Member)
        const convertedMembers: Member[] = studyDetail.members.map(
          (member: StudyMember) => ({
            id: member.memberId,
            name: member.name,
            profileImage: undefined, // API 응답에 없음
            isLeader: member.owner || member.role === "OWNER",
          })
        );

        setMembers(convertedMembers);
        setTotalMembers(studyDetail.members.length);
      } catch (error) {
        console.error("스터디 상세 조회 실패:", error);
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status === 403) {
            setError("스터디 멤버만 접근할 수 있습니다.");
          } else if (status === 404) {
            setError("스터디를 찾을 수 없습니다.");
            navigate("/Group");
          } else {
            setError("스터디 정보를 불러오는 중 오류가 발생했습니다.");
          }
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // To-Do 목록 조회
    const fetchTodos = async () => {
      setTodosLoading(true);
      setTodosError(null);
      try {
        const fetchedTodos = await getTodosByStudy(studyId);
        setTodos(fetchedTodos); // Store raw todos

        // Group fetchedTodos by groupName
        const grouped: { [key: string]: TodoGroup } = {};
        fetchedTodos.forEach(todoItem => {
          if (!grouped[todoItem.groupName]) {
            grouped[todoItem.groupName] = {
              id: todoItem.groupId, // Assuming groupId is unique for a group
              groupName: todoItem.groupName,
              todos: [],
            };
          }
          grouped[todoItem.groupName].todos.push({
            id: todoItem.id,
            name: todoItem.name,
            description: todoItem.description,
            dueDate: todoItem.dueDate,
            certificationMethods: todoItem.certificationMethods,
            isCompleted: todoItem.isCompleted,
            completedParticipants: todoItem.completedParticipants,
            totalParticipants: todoItem.totalParticipants,
            // Map to old Todo properties if still used by TodoItem
            taskName: todoItem.name,
            completedCount: todoItem.completedParticipants,
            totalCount: todoItem.totalParticipants,
            isChecked: todoItem.isCompleted,
          });
        });
        setGroupedTodos(Object.values(grouped));

      } catch (error) {
        console.error("To-Do 목록 조회 실패:", error);
        if (error instanceof AxiosError) {
          setTodosError(error.response?.data?.message || "To-Do 목록을 불러오는 중 오류가 발생했습니다.");
        } else {
          setTodosError("To-Do 목록을 불러오는 중 알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setTodosLoading(false);
      }
    };

    // 일정 목록 조회
    const fetchSchedules = async () => {
      setSchedulesLoading(true);
      setSchedulesError(null);
      try {
        const fetchedSchedules = await getSchedulesByStudy(studyId);
        setSchedules(fetchedSchedules);
      } catch (error) {
        console.error("일정 목록 조회 실패:", error);
        if (error instanceof AxiosError) {
          setSchedulesError(error.response?.data?.message || "일정 목록을 불러오는 중 오류가 발생했습니다.");
        } else {
          setSchedulesError("일정 목록을 불러오는 중 알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setSchedulesLoading(false);
      }
    };


    fetchStudyDetail();
    fetchTodos();
    fetchSchedules(); // Call fetchSchedules
  }, [studyId, navigate]);

  if (isLoading || todosLoading || schedulesLoading) { // Update loading condition
    return (
      <div className="bg-background flex flex-col items-center justify-center h-full">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background flex flex-col items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-background flex flex-col pb-5">
      <Header title={studyName} backPath="/Group" />
      <MemberHeader
        members={members}
        currentMembers={members.length}
        totalMembers={totalMembers}
        onViewAllClick={() => navigate("/Member", { state: { studyId, members } })}
      />
      <div className="flex flex-col gap-3 px-4">
        {hasCurrentScheduling && <Scheduling title={"시프 공부하기"} />}
        {schedulesError && <p className="text-red-500 text-center">{schedulesError}</p>}
        {!schedulesLoading && !schedulesError && <UpcomingSchedule isLeader={isLeader} studyId={studyId} schedules={schedules} />}
        {todosError && <p className="text-red-500 text-center">{todosError}</p>}
        {!todosLoading && !todosError && <TodoList isLeader={isLeader} studyId={studyId} todos={groupedTodos} />}
      </div>
    </div>
  );
}
