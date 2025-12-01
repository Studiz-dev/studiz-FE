// src/types/auth.ts

// 회원가입 요청 타입
export interface RegisterRequest {
  loginId: string;
  password: string;
  name: string;
}

// 회원가입 성공 응답 타입
export interface RegisterResponse {
  id: number;
  loginId: string;
  name: string;
  createdAt: string;
}

// 사용자 정보 수정 요청 타입
export interface UpdateUserRequest {
  name: string;
  profileImage?: File | null;
}

// 로그인 요청 타입
export interface LoginRequest {
  loginId: string;
  password: string;
}

// 로그인 성공 응답 타입
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
  user: {
    id: number;
    loginId: string;
    name: string;
  };
}
