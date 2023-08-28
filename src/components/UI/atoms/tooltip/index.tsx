import { GameEntity } from '@/types';
import { entityName } from '@/utils/entities.utils';
import * as S from './styled';
import { ReactNode } from 'react';

interface TooltipProps {
    dir: 'left' | 'right' | 'top' | 'bottom';
    children: ReactNode;
    [prop: string]: any;
}

export default function Tooltip({
    dir,
    children,
    ...props
}: TooltipProps) {
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