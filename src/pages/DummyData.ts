// 1. 다가오는 일정 데이터 타입 정의 (TypeScript)
export interface ScheduleItem {
  id: number;
  groupName: string;
  studyName: string;
  dateTime: string;
  dDay: string;
}

// 2. To-Do 데이터 타입 정의 (TypeScript)
export interface TodoItem {
  id: number;
  taskName: string;
  completedCount: number;
  totalCount: number;
  isChecked: boolean; // <-- 각 아이템의 체크 상태
}

export interface TodoGroup {
  id: number;
  groupName: string;
  todos: TodoItem[]; // <-- TodoItem 배열을 가짐
}

// --- 3. 더미 데이터 생성 ---

// "다가오는 일정" 더미 데이터
export const upcomingSchedules: ScheduleItem[] = [
  {
    id: 1,
    groupName: "스터디 그룹명",
    studyName: "진탐 스터디",
    dateTime: "2025년 9월 19일 (금) 오후 00:00",
    dDay: "D-DAY",
  },
  {
    id: 2,
    groupName: "스터디 그룹명",
    studyName: "진탐 스터디",
    dateTime: "2025년 9월 19일 (금) 오후 00:00",
    dDay: "D-DAY",
  },
  {
    id: 3,
    groupName: "스터디 그룹명",
    studyName: "진탐 스터디",
    dateTime: "2025년 9월 19일 (금) 오후 00:00",
    dDay: "D-DAY",
  },
];

// "To-Do" 더미 데이터
export const todoGroups: TodoGroup[] = [
  {
    id: 1,
    groupName: "스터디 그룹명",
    todos: [
      {
        id: 101,
        taskName: "시스템프로그래밍 과제 제출",
        completedCount: 2,
        totalCount: 4,
        isChecked: true,
      },
      {
        id: 102,
        taskName: "시스템프로그래밍 과제 제출",
        completedCount: 2,
        totalCount: 4,
        isChecked: true,
      },
      {
        id: 103,
        taskName: "시스템프로그래밍 과제 제출",
        completedCount: 2,
        totalCount: 4,
        isChecked: false,
      },
    ],
  },
  {
    id: 2,
    groupName: "스터디 그룹명",
    todos: [
      {
        id: 201,
        taskName: "시스템프로그래밍 과제 제출",
        completedCount: 2,
        totalCount: 4,
        isChecked: true,
      },
      {
        id: 202,
        taskName: "시스템프로그래밍 과제 제출",
        completedCount: 2,
        totalCount: 4,
        isChecked: false,
      },
    ],
  },
];
