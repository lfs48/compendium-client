import { ReactNode } from 'react';
import * as S from './styled';

interface LabelProps {
    children: ReactNode;
    [prop: string]: any;
}

export default function Label({
    children,
    ...props
}: LabelProps) {
    return(
        <S.Root {...props}>
            {children}
        </S.Root>
    )
}