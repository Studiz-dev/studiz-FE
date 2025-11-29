import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/back.svg?react";

interface HeaderProps {
    title: string;
    backPath?: string; // 이동경로 없으면 뒤로가기
    showBack?: boolean; // 화살표 표시 여부
    showBorder?: boolean; // 하단선 표시 여부
}

export default function Header({ title, backPath, showBack = true, showBorder = true }: HeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (backPath) {
            navigate(backPath);
        } else {
            navigate(-1); // 뒤로가기
        }
    };

    return (
        <header className={`relative flex items-center justify-center h-[70px] bg-white ${showBorder ? "border-b-[1.5px] border-main4" : ""}`}>
            {showBack && (
                <button onClick={handleBack} className="absolute left-2 p-2">
                    <BackIcon className="w-[27px] h-[32px]" />
                </button>
            )}
            <h1 className="text-[18px] font-semibold text-black1">
                {title}
            </h1>
        </header>
    );
}

