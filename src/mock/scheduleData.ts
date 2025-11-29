import type { ScheduleData, TimeSlot, ScheduleMember } from "../types/schedule";

// 시간대 생성 (09:00부터 23:00까지)
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 23; hour++) {
    slots.push({ hour, minute: 0 });
  }
  return slots;
};

// 날짜 생성 (5일)
const dates = ["9/1 월", "9/2 화", "9/3 수", "9/4 목", "9/5 금"];

// 멤버 목록 생성 - 각 멤버의 시간대별 가능 여부 정의
const generateMembers = (dates: string[], timeSlots: TimeSlot[]): ScheduleMember[] => {
  const members: ScheduleMember[] = [
    { id: 1, name: "김철수", availability: {} },
    { id: 2, name: "이영희", availability: {} },
    { id: 3, name: "박민수", availability: {} },
    { id: 4, name: "정수진", availability: {} },
    { id: 5, name: "최동욱", availability: {} },
    { id: 6, name: "한소영", availability: {} },
  ];

  // 각 멤버의 시간대별 가능 여부 초기화 (모두 false로 시작)
  dates.forEach((date) => {
    timeSlots.forEach((timeSlot) => {
      members.forEach((member) => {
        if (!member.availability) {
          member.availability = {};
        }
        if (!member.availability[date]) {
          member.availability[date] = {};
        }
        // 기본값은 false (불가능)
        member.availability[date][timeSlot.hour] = false;
      });
    });
  });

  // 각 멤버별 고정된 가능 시간 설정
  // 김철수: 9/1 월 9시~18시 가능
  if (members[0].availability) {
    if (!members[0].availability["9/1 월"]) members[0].availability["9/1 월"] = {};
    for (let hour = 9; hour <= 18; hour++) {
      members[0].availability["9/1 월"][hour] = true;
    }
  }

  // 이영희: 9/1 월 14시~17시 가능
  if (members[1].availability) {
    if (!members[1].availability["9/1 월"]) members[1].availability["9/1 월"] = {};
    for (let hour = 14; hour <= 17; hour++) {
      members[1].availability["9/1 월"][hour] = true;
    }
  }

  // 박민수: 9/1 월 9시~11시, 15시~18시 가능
  if (members[2].availability) {
    if (!members[2].availability["9/1 월"]) members[2].availability["9/1 월"] = {};
    for (let hour = 9; hour <= 11; hour++) {
      members[2].availability["9/1 월"][hour] = true;
    }
    for (let hour = 15; hour <= 18; hour++) {
      members[2].availability["9/1 월"][hour] = true;
    }
  }

  // 정수진: 9/2 화 10시~13시 가능
  if (members[3].availability) {
    if (!members[3].availability["9/2 화"]) members[3].availability["9/2 화"] = {};
    for (let hour = 10; hour <= 13; hour++) {
      members[3].availability["9/2 화"][hour] = true;
    }
  }

  // 최동욱: 9/3 수 11시~14시 가능
  if (members[4].availability) {
    if (!members[4].availability["9/3 수"]) members[4].availability["9/3 수"] = {};
    for (let hour = 11; hour <= 14; hour++) {
      members[4].availability["9/3 수"][hour] = true;
    }
  }

  // 한소영: 9/4 목 12시~15시 가능
  if (members[5].availability) {
    if (!members[5].availability["9/4 목"]) members[5].availability["9/4 목"] = {};
    for (let hour = 12; hour <= 15; hour++) {
      members[5].availability["9/4 목"][hour] = true;
    }
  }

  return members;
};

// 셀 데이터 생성
const generateCells = (dates: string[], timeSlots: TimeSlot[], maxMembers: number, allMembers: ScheduleMember[]): ScheduleData["cells"] => {
  const cells: ScheduleData["cells"] = [];
  
  dates.forEach((date) => {
    timeSlots.forEach((timeSlot) => {
      // 해당 시간대에 가능한 멤버와 불가능한 멤버 분리
      const availableMembers: ScheduleMember[] = [];
      const unavailableMembers: ScheduleMember[] = [];
      
      allMembers.forEach((member) => {
        const isAvailable = member.availability?.[date]?.[timeSlot.hour] ?? false;
        if (isAvailable) {
          availableMembers.push(member);
        } else {
          unavailableMembers.push(member);
        }
      });
      
      // 등록된 멤버 수는 가능한 멤버 수와 동일 (모든 가능한 멤버가 등록한 것으로 가정)
      const registeredMembers = availableMembers.length;
      
      cells.push({
        date,
        timeSlot,
        registeredMembers,
        maxMembers,
        isSelected: false,
        availableMembers,
        unavailableMembers,
      });
    });
  });
  
  return cells;
};

const timeSlots = generateTimeSlots();
const allMembers = generateMembers(dates, timeSlots);
const maxMembers = allMembers.length; // 멤버 수에 맞춰 동적으로 설정

export const mockScheduleData: ScheduleData = {
  id: 1,
  location: "융복합관 B101",
  studyName: "진탐 스터디",
  year: 2025,
  month: 9,
  dates,
  timeSlots,
  timeRange: { startHour: 9, endHour: 23 }, // 방장이 설정한 시간 범위 (9시부터 23시까지)
  maxMembers,
  cells: generateCells(dates, timeSlots, maxMembers, allMembers),
};

// 특정 날짜와 시간의 셀 찾기
export function findCell(
  data: ScheduleData,
  date: string,
  timeSlot: TimeSlot
): ScheduleData["cells"][0] | undefined {
  return data.cells.find(
    (cell) =>
      cell.date === date &&
      cell.timeSlot.hour === timeSlot.hour &&
      cell.timeSlot.minute === timeSlot.minute
  );
}

