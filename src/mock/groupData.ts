import type { StudyGroup } from "../types/group";

// 가입 코드로 그룹을 찾을 수 있는 mock 데이터
export const mockGroups: Array<StudyGroup & { code: string }> = [
  {
    id: 1,
    category: "척척학사",
    title: "시프공부를하자",
    leader: "나영이",
    totalMembers: 5,
    currentMembers: 1, // 스터디장 1명
    code: "1234", // 가입 코드
  },
];

// 가입 코드로 그룹 찾기 함수
export function findGroupByCode(code: string): StudyGroup | null {
  const group = mockGroups.find((g) => g.code === code);
  if (!group) return null;

  // code를 제외한 StudyGroup 타입 반환
  const { code: _, ...studyGroup } = group;
  return studyGroup;
}

// 초기 그룹 리스트 가져오기 (code 제외)
export function getInitialGroups(): StudyGroup[] {
  return mockGroups.map(({ code: _, ...group }) => group);
}

