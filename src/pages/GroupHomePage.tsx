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

  useEffect(() => {
    // studyId가 없으면 그룹 페이지로 리다이렉트
    if (!studyId) {
      navigate("/Group");
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

    fetchStudyDetail();
  }, [studyId, navigate]);

  if (isLoading) {
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
      />
      <div className="flex flex-col gap-3 px-4">
        {hasCurrentScheduling && <Scheduling title={"시프 공부하기"} />}
        <UpcomingSchedule />
        <TodoList />
      </div>
    </div>
  );
}
