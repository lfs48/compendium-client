import { ReactNode } from 'react';
import * as S from './styled';

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    block?: boolean;
    color?: 'blue' | 'red' | 'green';
    fill?: boolean;
    [prop: string]: any;
}

export default function Button({
    onClick,
    children,
    loading=false,
    disabled=false,
    block=false,
    fill=true,
    color='blue',
    ...props
}: ButtonProps) {
    return(
        <S.Root 
            disabled={disabled || loading}
            onClick={onClick}
            $block={block}
            $color={color}
            $fill={fill}
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