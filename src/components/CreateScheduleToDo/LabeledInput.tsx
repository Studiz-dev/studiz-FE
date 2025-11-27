interface LabeledInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export default function LabeledInput({ label, value, onChange, placeholder }: LabeledInputProps) {
    return (
        <div className="flex flex-col px-4 pt-5">
            <label className="text-[16px] font-semibold text-black1">
                {label}
            </label>
            <div className="pb-4 border-b-[1.5px] border-main4">
                <input type="text" value={value} onChange={onChange} placeholder={placeholder}
                className="w-full py-4 text-[14px] font-medium text-black1 placeholder:text-gray3 border-b-[1.5px] border-main2 focus:border-point focus:outline-none transition-colors"
            />
            </div> 
            
        </div>
    );
}