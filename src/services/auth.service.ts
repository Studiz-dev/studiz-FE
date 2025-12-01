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
  // If there is a profile image, use FormData. The backend might need to fix this endpoint for multipart.
  if (data.profileImage) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("profileImage", data.profileImage);

    // This request may still fail if the backend doesn't support multipart for this endpoint.
    const res = await api.put(`/users/${userId}`, formData);
    return res.data;
  } else {
    // If there is NO profile image, send as application/json.
    // This is to test if the backend expects JSON for non-file updates.
    const res = await api.patch(`/users/${userId}`, { name: data.name });
    return res.data;
  }
};

// 로그인
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};
