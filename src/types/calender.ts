import { dummySchedules } from "../mock/scheduleTodoData";

export type ScheduleForCalendar = {
  id: string;
  title: string;
};

// "2025년 9월 19일 (금) 오후 00:00" → Date 객체로 변환
function parseKoreanDate(str: string): Date {
  return new Date(
    str
      .replace("년 ", "-")
      .replace("월 ", "-")
      .replace("일", "")
      .replace(/\(.+\)/, "")
      .replace("오전 ", "")
      .replace("오후 ", "")
  );
}

export function convertSchedulesForCalendar() {
  const result: Record<string, ScheduleForCalendar[]> = {};

  dummySchedules.forEach((item) => {
    const date = parseKoreanDate(item.dateTime);

    const key = date.toISOString().split("T")[0]; // yyyy-mm-dd

    if (!result[key]) result[key] = [];

    result[key].push({
      id: String(item.id),
      title: item.scheduleName,
    });
  });

  return result;
}
