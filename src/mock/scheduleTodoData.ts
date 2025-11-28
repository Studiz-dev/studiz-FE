import type { ScheduleItem } from "../types/schedule";
import type { TodoGroup } from "../types/todo";

// "다가오는 일정" 더미 데이터
export const dummySchedules: ScheduleItem[] = [
  {
    id: 1,
    location: "빈트",
    scheduleName: "진탐 스터디",
    dateTime: "2025년 9월 19일 (금) 오후 00:00",
    dDay: 0,
  },
  {
    id: 2,
    location: "빈트",
    scheduleName: "진탐 스터디",
    dateTime: "2025년 9월 19일 (금) 오후 00:00",
    dDay: 1,
  },
  {
    id: 3,
    location: "빈트",
    scheduleName: "진탐 스터디",
    dateTime: "2025년 9월 19일 (금) 오후 00:00",
    dDay: 4,
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
        completedCount: 3,
        totalCount: 4,
        isChecked: true,
      },
      {
        id: 103,
        taskName: "시스템프로그래밍 과제 제출",
        completedCount: 2,
        totalCount: 5,
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
        completedCount: 1,
        totalCount: 4,
        isChecked: true,
      },
      {
        id: 202,
        taskName: "시스템프로그래밍 과제 제출",
        completedCount: 5,
        totalCount: 6,
        isChecked: false,
      },
    ],
  },
];
