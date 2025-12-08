export interface StudyGroup {
  id: string; // UUID
  category: string;
  title: string;
  leader: string;
  totalMembers: number;
  currentMembers: number;
  createdAt?: string; // 생성일시 (정렬용)
}

export type SortOrder = "최신순" | "오래된순";

// API 요청 타입
export interface CreateStudyRequest {
  name: string;
  meetingName: string;
  maxMembers: number;
  password: string;
  description?: string;
}

// API 응답 타입
export interface CreateStudyResponse {
  id: string;
  name: string;
  inviteCode: string;
  meetingName: string;
  maxMembers: number;
  status: string;
  createdAt: string;
}

// 스터디 상세 조회 응답 타입
export interface StudyMember {
  memberId: number;
  userId: number;
  loginId: string;
  name: string;
  role: string; // OWNER, MEMBER 등
  joinedAt: string;
  owner: boolean;
}

export interface StudyDetailResponse {
  id: string;
  name: string;
  description: string;
  status: string;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
  members: StudyMember[];
}
