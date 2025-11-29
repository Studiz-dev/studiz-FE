export interface ScheduleItem {
  id: number;
  location: string;
  scheduleName: string;
  dateTime: string;
  dDay: number;
}

export interface TimeSlot {
  hour: number;
  minute: number;
}

export interface ScheduleMember {
  id: number;
  name: string;
  availability?: Record<string, Record<number, boolean>>; // 날짜별, 시간별 가능 여부
}

export interface ScheduleCell {
  date: string; // "9/1 월" 형식
  timeSlot: TimeSlot;
  registeredMembers: number; // 해당 시간대에 등록한 멤버 수
  maxMembers: number; // 최대 인원
  isSelected?: boolean; // 현재 사용자가 선택했는지
  availableMembers?: ScheduleMember[]; // 가능한 멤버 목록
  unavailableMembers?: ScheduleMember[]; // 불가능한 멤버 목록
}

export interface ScheduleData {
  id: number;
  location: string; // "융복합관 B101"
  studyName: string; // "진탐 스터디"
  year: number; // 연도 (예: 2025)
  month: number; // 월 (예: 9)
  dates: string[]; // ["9/1 월", "9/2 화", ...]
  timeSlots: TimeSlot[]; // 시간대 목록
  maxMembers: number; // 최대 인원
  cells: ScheduleCell[]; // 모든 셀 데이터
}
