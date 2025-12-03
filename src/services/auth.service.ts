 // src/services/auth.service.ts

import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateUserRequest,
} from "@/types/auth";

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", data);
  return res.data;
};

// 이미지 업로드 서비스
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file); // 백엔드에서 'file'이라는 키로 받을 것으로 가정

  const res = await api.post<{ url:string }>("/files/upload", formData);
  return res.data.url;
};

// 사용자 정보 수정 (이름, 프로필 사진 등)
export const updateUser = async (
  userId: number,
  data: Partial<UpdateUserRequest>
) => {
  const res = await api.patch(`/users/${userId}`, data);
  return res.data;
};

// 로그인
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};
