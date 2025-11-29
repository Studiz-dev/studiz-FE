import type { TodoData } from "../types/todo";

export const mockTodoData: TodoData = {
  id: 1,
  groupName: "척척학사",
  title: "시스템프로그래밍 과제 제출",
  completedCount: 2,
  totalCount: 4,
  dueDate: "11월 19일 오후 11:59",
  progress: 50,
  completedMembers: [
    { 
      id: 1, 
      name: "사용자", 
      isCompleted: true,
      submittedFile: "abcd_ef.png",
      submittedComment: "소감문입니다."
    },
    { 
      id: 2, 
      name: "사용자", 
      isCompleted: true,
      submittedFile: "assignment.pdf",
      submittedComment: "소감문입니다."
    },
    { 
      id: 3, 
      name: "사용자", 
      isCompleted: true,
      submittedFile: "report.docx",
      submittedComment: "소감문입니다."
    },
  ],
  incompleteMembers: [
    { id: 4, name: "사용자", isCompleted: false },
    { id: 5, name: "사용자", isCompleted: false },
  ],
  isUserCompleted: false, // 기본값: 미완료
};

// ID로 ToDo 찾기 함수
export function findTodoById(id: number): TodoData | null {
  if (mockTodoData.id === id) {
    return mockTodoData;
  }
  return null;
}

