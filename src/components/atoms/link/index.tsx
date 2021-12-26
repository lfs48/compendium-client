import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';

interface LinkProps {
    to: string;
    children: ReactNode;
    block?: boolean;
    [prop: string]: any;
}

export default function Link({
    to,
    children,
    block,
    ...props
}: LinkProps) {

    const navigate = useNavigate();

    const handleLink = useCallback( () => {
        navigate(to);
    }, [to])

    return(
        <S.Root 
            onClick={handleLink}
            $block={block}
            {...props}
        >
            {children}
        </S.Root>
    )
}