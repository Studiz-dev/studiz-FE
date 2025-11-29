import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { login } from "@/services/auth.service";
import api from "@/services/api";
import logo from "../assets/logo.svg";
import open from "../assets/open.svg";
import close from "../assets/close.svg";
import ActionButton from "../components/ActionButton";

export default function MainPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const isDisabled = id.trim() === "" || pw.trim() === "";
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoginError(""); // 제출 시 기존 에러 초기화

    try {
      const res = await login({ loginId: id, password: pw });
      const { accessToken, refreshToken, tokenType } = res;

      // 1. 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 2. Axios 인스턴스에 인증 헤더 설정
      api.defaults.headers.common["Authorization"] = `${tokenType} ${accessToken}`;

      // 3. 홈페이지로 이동
      navigate("/home");
      
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status === 401) {
          console.error("[ERROR 401] 비밀번호가 일치하지 않습니다.");
          setLoginError("아이디 또는 비밀번호가 일치하지 않습니다.");
        } else if (status === 404) {
          console.error("[ERROR 404] 존재하지 않는 아이디입니다.");
          setLoginError("아이디 또는 비밀번호가 일치하지 않습니다.");
        } else {
          console.error("로그인 실패:", error);
          setLoginError("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
      } else {
        console.error("알 수 없는 오류:", error);
        setLoginError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[140px]">
      <img src={logo} alt="Logo" className="w-[180px] h-auto" />
      <div className="w-full flex items-start justify-center bg-white">
        <form onSubmit={onSubmit} className="w-full pt-20 pb-10">
          <label className="block font-medium text-base px-4 text-gray4 mb-2">
            아이디
          </label>
          <div className="px-4">
            <input
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                if (loginError) setLoginError("");
              }}
              placeholder="아이디를 입력해 주세요"
              className="
            w-full h-12 rounded-lg border-2
            border-main1 focus:border-point
            bg-white px-4 py-3 outline-none
            placeholder:text-gray4 font-normal text-sm
            transition"
            />
          </div>

          <label className="block font-medium text-base text-gray4 px-4 mt-6 mb-2">
            비밀번호
          </label>
          <div className="px-4">
            <div
              className="
            w-full h-12 rounded-lg border-2
            border-main1 focus-within:border-point
            bg-white flex items-center text-sm
            px-4 py-3
            transition
          "
            >
              <input
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  if (loginError) setLoginError("");
                }}
                className="flex-1 bg-transparent outline-none font-normal tracking-wider placeholder:text-[#505050] font-normal
            transition"
                placeholder="비밀번호를 입력해주세요."
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "비밀번호 가리기" : "비밀번호 보기"}
                className="ml-3 p-2 rounded-md hover:bg-gray-100"
              >
                {show ? (
                  <img
                    src={open}
                    alt="Open"
                    className="w-[24px] h-auto translate-x-2"
                  />
                ) : (
                  <img
                    src={close}
                    alt="Close"
                    className="w-[22px] h-auto translate-x-1.5"
                  />
                )}
              </button>
            </div>
            {loginError && (
              <p className="text-red-500 text-sm mt-1 px-1">{loginError}</p>
            )}
          </div>

          <div className="px-4 mt-6">
            <ActionButton
              text="로그인"
              isDisabled={isDisabled}
              type="submit"
            />
          </div>

          <p className="mt-8 text-center text-sm text-gray4">
            아직 계정이 없으신가요?{" "}
            <a
              href="/sign1"
              className="text-point text-sm font-semibold underline-offset-2 hover:underline"
            >
              회원가입하기
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
