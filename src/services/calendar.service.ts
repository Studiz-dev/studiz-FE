// src/services/calendar.service.ts
import api from "./api";
import type { GetCalendarSummaryResponse, GetDailySchedulesResponse } from "../types/calender";

export async function getCalendarSummary(studyId: string, year: number, month: number): Promise<GetCalendarSummaryResponse> {
  const response = await api.get<GetCalendarSummaryResponse>(`/calendar`, { // Changed from /api/calendar
    params: { studyId, year, month },
  });
  return response.data;
}

export async function getDailySchedules(studyId: string, date: string): Promise<GetDailySchedulesResponse> {
  const response = await api.get<GetDailySchedulesResponse>(`/calendar/${date}`, { // Changed from /api/calendar/${date}
    params: { studyId },
  });
  return response.data;
}
