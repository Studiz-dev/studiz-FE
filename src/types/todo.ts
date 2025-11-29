export interface TodoItem {
  id: number;
  taskName: string;
  completedCount: number;
  totalCount: number;
  isChecked: boolean; // <-- 각 아이템의 체크 상태
}

export interface TodoGroup {
  id: number;
  groupName: string;
  todos: TodoItem[]; // <-- TodoItem 배열을 가짐
}