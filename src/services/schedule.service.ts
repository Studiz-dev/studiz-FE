// src/services/schedule.service.ts
import api from "./api";
import type { CreateScheduleRequest, CreateScheduleResponse, GetSchedulesResponse } from "../types/schedule";

export async function createSchedule(
  studyId: string,
  data: CreateScheduleRequest
): Promise<CreateScheduleResponse> {
  const response = await api.post<CreateScheduleResponse>(
    `/studies/${studyId}/schedules`,
    data
  );
  return response.data;
}

export async function getSchedulesByStudy(studyId: string): Promise<GetSchedulesResponse> {
  const response = await api.get<GetSchedulesResponse>(`/studies/${studyId}/schedules`);
  return response.data;
}