export interface StudyGroup {
  id: number;
  category: string;
  title: string;
  leader: string;
  totalMembers: number;
  currentMembers: number;
}

export type SortOrder = "최신순" | "오래된순";
