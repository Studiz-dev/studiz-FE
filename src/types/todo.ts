export interface TodoMember {
  id: number;
  name: string;
  profileImage?: string;
  isCompleted: boolean;
  submittedFile?: string; // 제출한 파일명
  submittedComment?: string; // 제출한 소감문
  isMe?: boolean; // 현재 사용자인지 여부
}

export interface TodoData {
  id: number;
  groupName: string;
  title: string;
  completedCount: number;
  totalCount: number;
  dueDate: string;
  progress: number;
  completedMembers: TodoMember[];
  incompleteMembers: TodoMember[];
  isUserCompleted?: boolean; // 현재 사용자가 완료했는지 여부
}

export interface Todo {
  id: number;
  taskName: string;
  completedCount: number;
  totalCount: number;
  isChecked: boolean;
}

export interface TodoGroup {
  id: number;
  groupName: string;
  todos: Todo[];
}
