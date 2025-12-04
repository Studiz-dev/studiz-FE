// src/services/todo.service.ts
import api from "./api";
import type { CreateTodoRequest, CreateTodoResponse, GetTodosResponse } from "../types/todo";

export async function createTodo(
  studyId: string,
  data: CreateTodoRequest
): Promise<CreateTodoResponse> {
  const response = await api.post<CreateTodoResponse>(
    `/studies/${studyId}/todos`,
    data
  );
  return response.data;
}

export async function getTodosByStudy(studyId: string): Promise<GetTodosResponse> {
  const response = await api.get<GetTodosResponse>(`/studies/${studyId}/todos`);
  return response.data;
}