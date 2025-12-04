export interface ScheduleItem {
  id: string; // API 응답에 맞춰 string (UUID)
  title: string; // 일정 이름
  location?: string; // 장소 (선택사항)
  scheduleTime?: string; // YYYY M DD HH:mm 형식 (확정된 일정만)
  dday?: number; // 오늘 기준 남은 일수 (확정된 일정만)
}

export type GetSchedulesResponse = ScheduleItem[]; // GetSchedulesResponse는 ScheduleItem의 배열

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
  timeRange: { startHour: number; endHour: number }; // 방장이 설정한 시간 범위
  maxMembers: number; // 최대 인원
  cells: ScheduleCell[]; // 모든 셀 데이터
}

export interface CreateScheduleRequest {
  title: string;
  startDate: string; // "YYYY-MM-DD"
  location?: string;
}

export interface CreateScheduleResponse {
  id: number; // The ID of the newly created schedule
}


