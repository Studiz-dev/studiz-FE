import { useState } from "react";
import logo from '../assets/logo.svg'

export default function MainPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const isDisabled = id.trim() === "" || pw.trim() === "";

   const onSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    console.log({ id, pw });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-36">
      <img src={logo} alt="Logo" className="w-[180px] h-auto" />
      <div className="w-full flex items-start justify-center bg-white">
      <form
        onSubmit={onSubmit}
        className="w-full px-3 pt-20 pb-10">
        {/* 아이디 */}
        <label className="block font-medium text-gray4 mb-2">아이디</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해 주세요"
          className="
            w-full h-12 rounded-lg border-2
            border-main1 focus:border-point
            bg-white px-4 py-3 outline-none
            placeholder:text-gray4 font-normal
            transition
          "/>

        {/* 비밀번호 */}
        <label className="block font-medium text-gray4 mt-6 mb-2">
          비밀번호
        </label>
        <div
          className="
            w-full h-12 rounded-lg border-2
            border-main1 focus-within:border-point
            bg-white flex items-center
            px-4 py-3
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="#285943" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="3.2" stroke="#285943" strokeWidth="1.8" />
              </svg>
            ) : (
              // eye-off
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 3l18 18" stroke="#285943" strokeWidth="1.8"/>
                <path d="M2 12s3.5-6 10-6c2.2 0 4 .6 5.5 1.5M22 12s-3.5 6-10 6c-2.2 0-4-.6-5.5-1.5" stroke="#285943" strokeWidth="1.8"/>
                <path d="M9.9 9.9A3.2 3.2 0 0012 15.2c.6 0 1.1-.2 1.6-.4" stroke="#285943" strokeWidth="1.8"/>
              </svg>
            )}
          </button>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`
            w-full h-12 rounded-lg mt-12 text-white text-[18px] font-semibold
            ${isDisabled
              ? "bg-main1 cursor-not-allowed"
              : "bg-point hover:bg-[#4C6953] transition"}
          `}
        >
          로그인
        </button>

        {/* 가입 링크 */}
        <p className="mt-8 text-center text-Med14 text-gray4">
          아직 계정이 없으신가요?{" "}
          <a href="/sign1" className="text-point text-Med14 underline-offset-2 hover:underline">
            회원가입하기
          </a>
        </p>
      </form>
    </div>
    </div>
  )
}
