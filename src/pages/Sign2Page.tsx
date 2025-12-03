import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { uploadImage, updateUser } from "@/services/auth.service";
import edit from "../assets/edit.svg";
import Header from "../components/Header";

export default function Sign2Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 파일 상태

  const userId = location.state?.userId;

  // userId가 없으면 1단계로 돌려보냄
  useEffect(() => {
    if (!userId) {
      alert("잘못된 접근입니다. 가입 1단계부터 다시 진행해주세요.");
      navigate("/sign1");
    }
  }, [userId, navigate]);

  const isDisabled = name.trim() === "";

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file)); // 미리보기
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    // 이름 유효성 검사 (2-50자)
    if (name.trim().length < 2 || name.trim().length > 50) {
      setNameError("2-50자의 이름을 입력하세요.");
      return;
    }
    setNameError("");

    try {
      let profileImageUrl: string | undefined = undefined;

      // 1. 이미지가 선택되었으면 업로드하고 URL을 받는다
      if (imageFile) {
        // TODO: 업로드 중 로딩 상태 표시
        profileImageUrl = await uploadImage(imageFile);
      }

      // 2. 이름과 (있다면) 이미지 URL을 업데이트한다
      await updateUser(userId, {
        name,
        profileImage: profileImageUrl,
      });

      navigate("/done");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          console.log(
            "[ERROR 400] 요청 데이터 유효성 검사 실패:",
            error.response.data
          );
          setNameError("입력한 정보가 유효하지 않습니다. (서버오류)");
          return;
        }
      }
      console.error("⚠ 이름/프로필 업데이트 실패:", error);
      setNameError("업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <Header title="가입하기" backPath="/sign1" showBorder={false} />
      <div className="flex justify-center mt-8">
        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-main1 text-white font-semibold">
          1
        </div>
        <div className="flex justify-center items-center w-[35.5px] h-0.5 mt-4 rounded-sm bg-gray1 ml-5 mr-5"></div>
        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-main1 text-white font-semibold">
          2
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="relative w-28 h-28 mt-16">
          {image ? (
            <img
              src={image}
              alt="프로필 미리보기"
              className="w-28 h-28 rounded-full border-4 border-point object-cover bg-gray-100"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-point bg-gray-200" />
          )}

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
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) setNameError(""); // 입력 시작하면 에러 메시지 제거
            }}
            placeholder="사용하실 이름을 입력해 주세요"
            className="
            w-full h-12 rounded-lg border-2
            border-main1 focus:border-point
            bg-white px-4 py-3 outline-none
            placeholder:text-gray4 font-normal text-sm
            transition
          "
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
          <button
            type="submit"
            disabled={isDisabled}
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
      </form>
    </div>
  );
}
