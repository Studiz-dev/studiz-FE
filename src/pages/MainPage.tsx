import { useState } from "react";
import logo from "../assets/logo.svg";
import open from "../assets/open.svg";
import close from "../assets/close.svg";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";

export default function MainPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const isDisabled = id.trim() === "" || pw.trim() === "";
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    console.log({ id, pw });
  };
  const handleLoginClick = () => {
    if (isDisabled) return;
    navigate("/sign1");
  };
  return (
    <div className="flex flex-col items-center justify-center pt-[140px]">
      <img src={logo} alt="Logo" className="w-[180px] h-auto" />
      <div className="w-full flex items-start justify-center bg-white">
        <form onSubmit={onSubmit} className="w-full pt-20 pb-10">
          {/* 아이디 */}
          <label className="block font-medium text-base px-4 text-gray4 mb-2">
            아이디
          </label>
          <div className="px-4">
            <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력해 주세요"
            className="
            w-full h-12 rounded-lg border-2
            border-main1 focus:border-point
            bg-white px-4 py-3 outline-none
            placeholder:text-gray4 font-normal text-sm
            transition"/>
          </div>
          

          {/* 비밀번호 */}
          <label className="block font-medium text-base text-gray4 px-4 mt-6 mb-2">
            비밀번호
          </label>
          <div className="px-4">
            <div
            className="
            w-full h-12 rounded-lg border-2
            border-main1 focus-within:border-point
            bg-white flex items-center text-sm
            px-4 py-3 mb-6
            transition
          "
          >
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
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
              {/* 눈/가림 아이콘 (SVG) */}
              {show ? (
                // eye
                <img
                  src={open}
                  alt="Open"
                  className="w-[24px] h-auto translate-x-2"
                />
              ) : (
                // eye-off
                <img
                  src={close}
                  alt="Close"
                  className="w-[22px] h-auto translate-x-1.5"
                />
              )}
            </button>
          </div>
          
          </div>

          {/* 로그인 버튼 */}
          <ActionButton
            text="로그인"
            onClick={handleLoginClick} 
            isDisabled={isDisabled}
            type="button" 
          />

          {/* 가입 링크 */}
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
