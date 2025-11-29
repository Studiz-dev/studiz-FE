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

// 사용자 정보 수정 (이름, 프로필 사진 등)
export const updateUser = async (
  userId: number,
  data: UpdateUserRequest
) => {
  // FormData를 사용하여 이미지와 다른 데이터를 함께 보낼 수 있습니다.
  // 백엔드에서 이미지 처리를 안하므로 일단 이름만 보냅니다.
  const res = await api.patch(`/users/${userId}`, data);
  return res.data;
};

// 로그인
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};
