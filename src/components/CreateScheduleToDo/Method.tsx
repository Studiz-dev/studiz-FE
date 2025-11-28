import CheckBox from '../../assets/CheckBox.svg?react';

interface MethodProps { // Method가 받을 props의 형태
  selectedMethods: {
    file: boolean;
    text: boolean;
  };
  setSelectedMethods: (value: { file: boolean; text: boolean }) => void;
}
export default function Method({ selectedMethods, setSelectedMethods }: MethodProps) {

  const toggleMethod = (key: "file" | "text") => {
    setSelectedMethods({ ...selectedMethods, [key]: !selectedMethods[key], }); // file이나 text 둘 중 하나를 인자로 받아서 기존 값들을 복사해둔 뒤 현재 key의 값만 반대값으로 덮어쓴다.
  };
  return (
    <div className="flex flex-col gap-3 px-4 pt-5 ">
      <h1 className="text-[16px] font-semibold text-black1">
        인증 방식
      </h1>
      <div className="flex flex-col gap-1">
        <div className="flex items-center h-8 gap-2">
          <CheckBox onClick={() => toggleMethod("file")}
            className={`w-6 h-6 cursor-pointer ${selectedMethods.file ? "text-point" : "text-main3"}`} />
          <span className="text-[14px] font-medium text-black1">
            인증파일 업로드
          </span>
        </div>
        <div className="flex items-center h-8 gap-2 w-full pb-4 border-b-[1.5px] border-main4">
          <CheckBox onClick={() => toggleMethod("text")}
            className={`w-6 h-6 cursor-pointer ${selectedMethods.text ? "text-point" : "text-main3"}`} />
          <span className="text-[14px] font-medium text-black1">
            소감문 작성
          </span>
        </div>
      </div>
    </div>
  )
}