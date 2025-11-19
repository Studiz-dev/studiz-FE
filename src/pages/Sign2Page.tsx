import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../assets/back.svg";
import edit from "../assets/edit.svg";

export default function Sign2Page() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const isDisabled = name.trim() === "";

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // 미리보기
    }
  };

  return (
    /*상단 헤더*/
    <div className="mt-[40px]">
      <div className="grid grid-cols-3 items-center h-10">
        <img
          src={back}
          alt="Back"
          className="justify-self-start pl-4 cursor-pointer"
          onClick={() => navigate("/sign1")}
        />
        <div className="justify-self-center font-semibold text-lg">
          가입하기
        </div>
      </div>
      {/*스텝 표시*/}
      <div className="flex justify-center mt-8">
        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-main1 text-white font-semibold">
          1
        </div>
        <div className="flex justify-center items-center w-[35.5px] h-0.5 mt-4 rounded-sm bg-gray1 ml-5 mr-5"></div>
        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-main1 text-white font-semibold">
          2
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="relative w-28 h-28">
          {/* 이미지 미리보기 */}
          {image ? (
            <img
              src={image}
              alt="프로필 미리보기"
              className="w-28 h-28 rounded-full border-4 border-point object-cover bg-gray-100"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-point bg-gray-200" />
          )}

          {/* 연필 아이콘 */}
          <label className="absolute bottom-1 right-1 bg-point w-6 h-6 rounded-full flex justify-center items-center cursor-pointer">
            <img src={edit} alt="edit" className="w-3 h-3" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </div>
        <div className="w-full max-w-sm mx-auto px-3 pt-20 pb-4">
          <label className="block font-medium text-base text-gray4 mb-2">
            이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="사용하실 이름을 입력해 주세요"
            className="
            w-full h-12 rounded-lg border-2
            border-main1 focus:border-point
            bg-white px-4 py-3 outline-none
            placeholder:text-gray4 font-normal text-sm
            transition
          "
          />
          <button
            type="submit"
            disabled={isDisabled}
            onClick={() => navigate("/done")}
            className={`
            w-full h-12 rounded-lg mt-[84px] text-white text-[18px] font-semibold
            ${
              isDisabled
                ? "bg-main1 cursor-not-allowed"
                : "bg-point hover:bg-[#4C6953] transition"
            }
          `}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
}
