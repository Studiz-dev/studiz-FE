import api from "./api";
import axios from "axios";
import type {
  CreateStudyRequest,
  CreateStudyResponse,
  StudyDetailResponse,
} from "../types/group";

/**
 * 스터디 생성 API
 * @param data 스터디 생성 요청 데이터 (name, description)
 * @returns 생성된 스터디 정보
 */
export async function createStudy(
  data: CreateStudyRequest
): Promise<CreateStudyResponse> {
  const response = await api.post<CreateStudyResponse>("/studies", data);
  return response.data;
}

/**
 * 초대 코드로 스터디 정보 조회 API
 * 인증 불필요한 공개 API이므로 별도 인스턴스 사용
 * @param code 초대 코드 (8자리)
 * @returns 스터디 정보
 */
export async function getStudyByInviteCode(
  code: string
): Promise<CreateStudyResponse> {
  // 인증 불필요한 공개 API이므로 Authorization 헤더 없이 호출
  const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });
  
  const response = await publicApi.get<CreateStudyResponse>(
    `/studies/invite/${code}`
  );
  return response.data;
}

/**
 * 스터디 상세 조회 API
 * @param studyId 스터디 ID (UUID)
 * @returns 스터디 상세 정보 및 멤버 목록
 */
export async function getStudyDetail(
  studyId: string
): Promise<StudyDetailResponse> {
  const response = await api.get<StudyDetailResponse>(`/studies/${studyId}`);
  return response.data;
}

