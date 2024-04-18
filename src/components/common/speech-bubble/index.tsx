import * as S from './styled';
import { ReactNode } from 'react';

interface SpeechBubbleProps {
    dir: 'left' | 'right' | 'top' | 'bottom';
    children: ReactNode;
    [prop: string]: any;
}

export default function SpeechBubble({
    dir,
    children,
    ...props
}: SpeechBubbleProps) {
    return(
        <S.Root
            $dir={dir}
            {...props}
        >
            <S.Content>
                <S.Arrow $dir={dir}/>
                {children}
            </S.Content>
        </S.Root>
    )
}