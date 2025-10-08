import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from '../assets/back.svg'
import open from '../assets/open.svg'
import close from '../assets/close.svg'

export default function Sign1Page() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwc, setPwc] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const isDisabled =
    id.trim() === "" || pw.trim() === "" || pwc.trim() === "" || pw !== pwc;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    if (pw !== pwc) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setError("");
    console.log({ id, pw });
  };

  return (
  /*상단 헤더*/
  <div className="mt-[130px]">
    <div className="grid grid-cols-3 items-center h-10">
     <img
          src={back}
          alt="Back"
          className="justify-self-start pl-4 cursor-pointer"
          onClick={() => navigate("/")}
        />
      <div className="justify-self-center font-semibold text-lg">가입하기</div>
    </div>
  {/*스텝 표시*/}
    <div className="flex justify-center mt-6">
      <div className="flex justify-center items-center w-8 h-8 rounded-full bg-main1 text-white font-semibold">
      1</div>
      <div className="flex justify-center items-center w-[35.5px] h-0.5 mt-4 rounded-sm bg-gray1 ml-5 mr-5"></div>
      <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray1 text-white font-semibold">
      2</div>
    </div>
    {/*아이디,비밀번호 입력*/}
    <form
        onSubmit={onSubmit}
        className="w-full px-3 pt-12 pb-10">
        {/* 아이디 */}
        <label className="block font-medium text-base text-gray4 mb-2">아이디</label>
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
            transition
          "/>

        {/* 비밀번호 */}
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
            {/* 눈가림 아이콘 */}
            {show ? (
              // eye
              <img src={open} alt="Open" className="w-[24px] h-auto translate-x-2"/>
            ) : (
              // eye-off
              <img src={close} alt="Close" className="w-[22px] h-auto translate-x-1.5"/>
            )}
          </button>
        </div>
        {/* 비밀번호 확인 */}
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
                setError("비밀번호가 일치하지 않습니다.");
              } else {
                setError("");
              }
            }}
            className="flex-1 bg-transparent outline-none font-normal tracking-wider placeholder:text-[#505050] transition"
            placeholder="비밀번호를 한번 더 입력해주세요."
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "비밀번호 가리기" : "비밀번호 보기"}
            className="ml-3 p-2 rounded-md hover:bg-gray-100"
          >
            {/* 눈가림 아이콘 */}
            {show ? (
              // eye
              <img src={open} alt="Open" className="w-[24px] h-auto translate-x-2"/>
            ) : (
              // eye-off
              <img src={close} alt="Close" className="w-[22px] h-auto translate-x-1.5"/>
            )}
          </button>
        </div>
        {/* 에러메시지 */}
        <div className="h-5 mt-2"> 
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isDisabled}
          onClick={() => navigate("/sign2")}
          className={`
            w-full h-12 rounded-lg mt-6 text-white text-[18px] font-semibold
            ${isDisabled
              ? "bg-main1 cursor-not-allowed"
              : "bg-point hover:bg-[#4C6953] transition"}
          `}
        >다음으로
        </button>
      </form>
    </div>
  )
}