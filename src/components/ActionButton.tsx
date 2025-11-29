interface ActionButtonProps {
    text: string;
    onClick: () => void;
    isDisabled: boolean;
    type?: "submit" | "button"; // 버튼 타입 (기본값은 button)
}

export default function ActionButton({
    text,
    onClick,
    isDisabled,
    type = "button",
}: ActionButtonProps) {
    const stateClasses = isDisabled
        ? "bg-main2 cursor-not-allowed"
        : "bg-point hover:bg-[#4C6953] transition";

    return (
        <div className="sticky bottom-0 left-0 right-0 w-full bg-white z-30 pb-[env(safe-area-inset-bottom)] pt-3">
            <div className="px-4 pb-3">
                <button
                    type={type}
                    disabled={isDisabled}
                    onClick={onClick}
                    className={`w-full h-12 rounded-[8px] text-white text-[18px] font-semibold ${stateClasses}`}
                >
                    {text}
                </button>
            </div>
        </div>
    );
}
