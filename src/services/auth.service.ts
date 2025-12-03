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

  // FormData를 보낼 때는 Content-Type을 명시하지 않아야
  // 브라우저가 자동으로 boundary를 포함한 multipart/form-data를 설정합니다
  const res = await api.post<{ url: string }>("/files/upload", formData, {
    headers: {
      // Content-Type을 명시적으로 제거하여 브라우저가 자동으로 설정하도록 함
      "Content-Type": undefined,
    },
  });
  return res.data.url;
};

// 사용자 정보 수정 (이름, 프로필 사진 등)
// 현재 로그인한 사용자의 프로필을 수정합니다 (토큰 기반)
export const updateUser = async (
  data: Partial<UpdateUserRequest>
) => {
  // 백엔드 UserController는 @RequestMapping("/users")로 되어 있고
  // context-path가 /api이므로 실제 경로는 /api/users/me가 됩니다
  const res = await api.patch("/users/me", data);
  return res.data;
};

// 로그인
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};
