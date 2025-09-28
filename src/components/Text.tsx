import React from 'react';

interface TextProps {
    children: React.ReactNode;
    variant: 'Sem20' | 'Sem18' | 'Sem16' | 'Sem14' | 'Sem12' | 'Med16' | 'Med14' | 'Med12' | 'Reg16' | 'Reg14' | 'Reg12' | 'Reg10' | 'Reg8';
    className?: string;
}

function Text({ children, variant, className }: TextProps) {
    const styles = {
        Sem20: 'font-semibold text-20 tracking-[-2.5%] leading-[140%]',
        Sem18: 'font-semibold text-18 tracking-[-2.5%] leading-[140%]',
        Sem16: 'font-semibold text-16 tracking-[-2.5%] leading-[140%]',
        Sem14: 'font-semibold text-14 tracking-[-2.5%] leading-[140%]',
        Sem12: 'font-semibold text-12 tracking-[-2.5%] leading-[140%]',
        Med16: 'font-medium text-16 tracking-[-2.5%] leading-[140%]',
        Med14: 'font-medium text-14 tracking-[-2.5%] leading-[140%]',
        Med12: 'font-medium text-12 tracking-[-2.5%] leading-[140%]',
        Reg16: 'font-regular text-16 tracking-[-2.5%] leading-[140%]',
        Reg14: 'font-regular text-14 tracking-[-2.5%] leading-[140%]',
        Reg12: 'font-regular text-12 tracking-[-2.5%] leading-[140%]',
        Reg10: 'font-regular text-10 tracking-[-2.5%] leading-[140%]',
        Reg8: 'font-regular text-8 tracking-[-2.5%] leading-[140%]',
    }
    return <p className={`${styles[variant]} ${className}`}>{children}</p>;
}

export default Text;