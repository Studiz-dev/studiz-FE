export interface TodoMember {
  id: number;
  name: string;
  profileImage?: string;
  isCompleted: boolean;
  submittedFile?: string; // 제출한 파일명
  submittedComment?: string; // 제출한 소감문
  isMe?: boolean; // 현재 사용자인지 여부
}

// 기존 Todo 인터페이스를 API 응답에 맞춰 업데이트
export interface Todo {
  id: number;
  name: string; // API 응답의 '이름' 필드
  description?: string; // API 응답의 '설명' 필드
  dueDate: string; // API 응답의 '마감일' 필드
  certificationMethods: ("TEXT_NOTE" | "FILE_UPLOAD")[]; // API 응답의 '인증 방식' 필드
  isCompleted: boolean; // API 응답의 '완료 상태' 필드 (현재 사용자 기준 또는 전체)
  completedParticipants: number; // API 응답의 '완료된 참여자 수' 필드
  totalParticipants: number; // API 응답의 '전체 참여자 수' 필드
  // 기존 ToDoItem에서 사용되던 필드 중 필요한 것들을 유지
  taskName?: string; // 기존 TodoItem과 호환성을 위해 유지
  completedCount?: number; // 기존 TodoItem과 호환성을 위해 유지
  totalCount?: number; // 기존 TodoItem과 호환성을 위해 유지
  isChecked?: boolean; // 기존 TodoItem과 호환성을 위해 유지
}

export interface TodoGroup {
  id: number;
  groupName: string;
  todos: Todo[];
}

export interface CreateTodoRequest {
  name: string;
  dueDate: string; // ISO 8601 format, e.g., "YYYY-MM-DDTHH:mm:ss"
  certificationTypes: ("TEXT_NOTE" | "FILE_UPLOAD")[];
  participantIds: number[];
}

export interface CreateTodoResponse {
  id: number; // Assuming the created todo has an ID
}

// 새로운 API 응답을 위한 인터페이스
export interface GetTodoItemResponse {
  id: number;
  name: string;
  description?: string;
  dueDate: string;
  certificationMethods: ("TEXT_NOTE" | "FILE_UPLOAD")[];
  isCompleted: boolean; // 완료 상태 (현재 사용자 기준)
  completedParticipants: number;
  totalParticipants: number;
  groupId: number; // 어떤 그룹에 속한 todo인지 식별하기 위해 추가
  groupName: string; // 그룹 이름을 직접 제공하면 유용
}

export type GetTodosResponse = GetTodoItemResponse[];

