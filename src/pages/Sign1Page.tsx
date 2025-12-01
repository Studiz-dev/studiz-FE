import { useState } from "react";
import { useNavigate } from "react-router-dom";
import open from "../assets/open.svg";
import close from "../assets/close.svg";
import Header from "../components/Header";
import { register, login } from "@/services/auth.service";
import type { RegisterRequest } from "@/types/auth";
import { AxiosError } from "axios";

export default function Sign1Page() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwc, setPwc] = useState("");
  const [show, setShow] = useState(false);

  const [errorPw, setErrorPw] = useState("");
  const [errorId, setErrorId] = useState("");

  const isDisabled =
    id.trim() === "" || pw.trim() === "" || pwc.trim() === "" || pw !== pwc;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    if (pw !== pwc) {
      setErrorPw("비밀번호가 일치하지 않습니다.");
      return;
    }
    setErrorPw("");
    setErrorId("");

    const body: RegisterRequest = {
      loginId: id,
      password: pw,
      name: "이름미정", // 임시 이름
    };

    try {
      const res = await register(body);
      console.log("ID/PW 등록 성공", res);

      // 1단계 성공 후 바로 로그인하여 토큰 획득
      const loginRes = await login({ loginId: id, password: pw });
      localStorage.setItem("accessToken", loginRes.accessToken);
      console.log("자동 로그인 및 토큰 저장 성공");

      // 성공 시, userId를 state로 전달하며 다음 페이지로 이동
      navigate("/sign2", { state: { userId: res.id } });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setErrorId("이미 사용 중인 아이디입니다.");
          return; // 여기서 함수 실행을 중단
        }
        if (error.response?.status === 400) {
          // 서버에서 오는 유효성 검사 메시지를 표시할 수 있습니다.
          // 예: setErrorId('아이디는 5자 이상이어야 합니다.');
          setErrorId("아이디 또는 비밀번호 형식이 올바르지 않습니다.");
          console.log("[ERROR 400] ID/PW 유효성 검사 실패:", error.response.data);
          return; // 여기서 함수 실행을 중단
        }
      }
      // 기타 예상치 못한 오류 처리
      setErrorId("가입 중 알 수 없는 오류가 발생했습니다.");
      console.error("기타 오류:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <Header title="가입하기" backPath="/" showBorder={false} />

      <div className="flex justify-center mt-8">
        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-main1 text-white font-semibold">
          1
        </div>
        <div className="flex justify-center items-center w-[35.5px] h-0.5 mt-4 rounded-sm bg-gray1 ml-5 mr-5"></div>
        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray1 text-white font-semibold">
          2
        </div>
      </div>

      <form onSubmit={onSubmit} className="w-full max-w-sm mx-auto px-3 pt-16 pb-10">

        <label className="block font-medium text-base text-gray4 mb-2">아이디</label>

        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setErrorId("");
          }}
          placeholder="아이디를 입력해 주세요"
          className="
            w-full h-12 rounded-lg border-2
            border-main1 focus:border-point
            bg-white px-4 py-3 outline-none
            placeholder:text-gray4 font-normal text-sm
            transition
          "
        />

        {errorId && (
          <p className="text-red-500 text-sm mt-1">{errorId}</p>
        )}

        <label className="block font-medium text-base text-gray4 mt-6 mb-2">
          비밀번호
        </label>
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
              setErrorPw("");
            }}
            className="flex-1 bg-transparent outline-none font-normal tracking-wider placeholder:text-[#505050] transition"
            placeholder="비밀번호를 입력해주세요."
          />

          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="ml-3 p-2 rounded-md hover:bg-gray-100"
          >
            <img
              src={show ? open : close}
              alt="Toggle"
              className={show ? "w-[24px] translate-x-2" : "w-[22px] translate-x-1.5"}
            />
          </button>
        </div>

        <label className="block font-medium text-base text-gray4 mt-6 mb-2">
          비밀번호 확인
        </label>
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
            value={pwc}
            onChange={(e) => {
              setPwc(e.target.value);
              if (pw && e.target.value && pw !== e.target.value) {
                setErrorPw("비밀번호가 일치하지 않습니다.");
              } else {
                setErrorPw("");
              }
            }}
            className="flex-1 bg-transparent outline-none font-normal tracking-wider placeholder:text-[#505050] transition"
            placeholder="비밀번호를 한번 더 입력해주세요."
          />
        </div>

        {errorPw && (
          <p className="text-red-500 text-sm mt-1">{errorPw}</p>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className={`
            w-full h-12 rounded-lg mt-10 text-white text-[18px] font-semibold
            ${isDisabled
              ? "bg-main1 cursor-not-allowed"
              : "bg-point hover:bg-[#4C6953] transition"
            }
          `}
        >
          다음으로
        </button>
      </form>
    </div>
  );
}
