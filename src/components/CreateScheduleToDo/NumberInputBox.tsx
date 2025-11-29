export default function NumberInputBox(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const hasValue = props.value && String(props.value).length > 0;
    const currentBorderColor = hasValue ? 'border-point' : 'border-main2';
    return (
        <div className={`w-[42px] h-[36px] border-[1.5px] rounded-[8px] flex items-center justify-center transition-colors ${currentBorderColor} focus-within:border-point`}>
            <input type="tel" placeholder="00" {...props}
                className="w-full h-full bg-transparent text-center text-[14px] font-regular text-black1 placeholder:text-gray3 focus:outline-none"
            />
        </div>
    )
}