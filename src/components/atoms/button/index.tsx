import { ReactNode } from 'react';
import * as S from './styled';

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    [prop: string]: any;
}

export default function Button({
    onClick,
    children,
    ...props
}: ButtonProps) {
    return(
        <S.Root 
            onClick={onClick}
            {...props}
        >
            {children}
        </S.Root>
    )
}