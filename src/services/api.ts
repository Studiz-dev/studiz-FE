import type { AxiosInstance } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 필요 없으면 제거 가능
  // 기본 헤더는 설정하지 않음 (각 요청에서 필요에 따라 설정)
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // Token 자동 삽입 (필요하면)
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // FormData를 보낼 때는 Content-Type을 제거하여 브라우저가 자동으로 boundary를 포함한 Content-Type을 설정하도록 함
    if (config.data instanceof FormData) {
      // axios의 기본 Content-Type 헤더를 완전히 제거
      // 브라우저가 자동으로 multipart/form-data; boundary=... 를 설정하도록 함
      if (config.headers) {
        // 모든 가능한 Content-Type 헤더 제거
        delete config.headers["Content-Type"];
        delete config.headers["content-type"];
        // 명시적으로 undefined로 설정하여 axios가 헤더를 설정하지 않도록 함
        config.headers["Content-Type"] = undefined as any;
      }
    } else {
      // FormData가 아닐 때만 application/json 설정
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default api;
