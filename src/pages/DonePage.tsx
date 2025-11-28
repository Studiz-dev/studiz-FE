import { useNavigate } from "react-router-dom";
import CheckIcon from "../assets/check-icon.svg";
import Header from "../components/Header";

export default function DonePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white">
      <Header title="가입 완료" showBack={false} showBorder={false} />
      <div className="flex flex-col items-center justify-center gap-5 mt-40">
        <img src={CheckIcon} alt="CheckIcon" className="w-[96px] h-auto" />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="font-semibold text-[18px] text-black1">
            회원가입이 완료되었습니다.
          </div>
          <div className="font-medium text-[14px] text-gray3">
            시작하기를 눌러 스터디즈를 이용해 보세요!
          </div>
        </div>
      </div>
      <div className="w-full max-w-sm mx-auto px-3 mt-[92px]">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="
        w-full h-12 rounded-lg mt-10 text-white text-[18px] font-semibold bg-point hover:bg-[#4C6953] transition"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
