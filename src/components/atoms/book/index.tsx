import { ReactNode } from 'react';
import * as S from './styled';

interface BookProps {
    children: ReactNode;
    [prop: string]: any;
}

export default function Book({
    children, 
    ...props
}: BookProps) {
    return(
        <S.Root {...props}>
            <S.Spine />
            <S.Bookmark />
            {children}
        </S.Root>
    )
}