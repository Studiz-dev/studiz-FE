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

  // 각 멤버의 시간대별 가능 여부 설정
  dates.forEach((date) => {
    timeSlots.forEach((timeSlot) => {
      members.forEach((member) => {
        if (!member.availability) {
          member.availability = {};
        }
        if (!member.availability[date]) {
          member.availability[date] = {};
        }
        // 랜덤하게 가능/불가능 설정 (예시)
        // 실제로는 각 멤버의 스케줄에 따라 설정
        const isAvailable = Math.random() > 0.3; // 70% 확률로 가능
        member.availability[date][timeSlot.hour] = isAvailable;
      });
    });
  });

  // 예시: 특정 멤버들의 특정 시간대 설정
  // 김철수: 9/1 월 9시~12시 가능, 13시~18시 가능
  if (members[0].availability && members[0].availability["9/1 월"]) {
    members[0].availability["9/1 월"][9] = true;
    members[0].availability["9/1 월"][10] = true;
    members[0].availability["9/1 월"][11] = true;
    members[0].availability["9/1 월"][12] = true;
    members[0].availability["9/1 월"][13] = true;
    members[0].availability["9/1 월"][14] = true;
    members[0].availability["9/1 월"][15] = true;
    members[0].availability["9/1 월"][16] = true;
    members[0].availability["9/1 월"][17] = true;
    members[0].availability["9/1 월"][18] = true;
  }

  // 이영희: 9/1 월 14시~17시 가능
  if (members[1].availability && members[1].availability["9/1 월"]) {
    members[1].availability["9/1 월"][14] = true;
    members[1].availability["9/1 월"][15] = true;
    members[1].availability["9/1 월"][16] = true;
    members[1].availability["9/1 월"][17] = true;
  }

  // 박민수: 9/1 월 9시~11시, 15시~18시 가능
  if (members[2].availability && members[2].availability["9/1 월"]) {
    members[2].availability["9/1 월"][9] = true;
    members[2].availability["9/1 월"][10] = true;
    members[2].availability["9/1 월"][11] = true;
    members[2].availability["9/1 월"][15] = true;
    members[2].availability["9/1 월"][16] = true;
    members[2].availability["9/1 월"][17] = true;
    members[2].availability["9/1 월"][18] = true;
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
      
      // 등록된 멤버 수는 가능한 멤버 중 일부가 등록한 것으로 가정
      const registeredMembers = Math.min(availableMembers.length, Math.floor(Math.random() * (maxMembers + 1)));
      
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
const maxMembers = allMembers.length; // 멤버 배열의 길이로 자동 설정

export const mockScheduleData: ScheduleData = {
  id: 1,
  location: "융복합관 B101",
  studyName: "진탐 스터디",
  dates,
  timeSlots,
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

