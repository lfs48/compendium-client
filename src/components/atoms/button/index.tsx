import { ReactNode } from 'react';
import * as S from './styled';

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    block?: boolean;
    [prop: string]: any;
}

export default function Button({
    onClick,
    children,
    loading=false,
    disabled=false,
    block=false,
    ...props
}: ButtonProps) {
    return(
        <S.Root 
            disabled={disabled || loading}
            onClick={onClick}
            $block={block}
            {...props}
        >
            {loading &&
                <S.LoadingContainer>
                    <S.Spinner />
                </S.LoadingContainer>
            }
            <S.Content $loading={loading}>
                {children}
            </S.Content>
        </S.Root>
    )
}