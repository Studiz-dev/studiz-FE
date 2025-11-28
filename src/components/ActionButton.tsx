interface ActionButtonProps {
    text: string;
    onClick: () => void;
    isDisabled: boolean;
    type?: "submit" | "button"; // 버튼 타입 (기본값은 button)
}

export default function ActionButton({ text, onClick, isDisabled, type = "button" }: ActionButtonProps) {

    const stateClasses = isDisabled
        ? "bg-main2 cursor-not-allowed" // 비활성화 (흐린 배경색, 마우스 포인터 변경)
        : "bg-point hover:bg-[#4C6953] transition"; // 활성화 (포인트 색상, 호버 시 색상 변경)

    return (
        <div className="px-4 my-4">
            <button type={type} disabled={isDisabled} onClick={onClick}
                className={`w-full h-12 rounded-[8px] text-white text-[18px] font-semibold ${stateClasses}`}>
                {text}
            </button>
        </div>
    );
}