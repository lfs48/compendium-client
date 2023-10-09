import { ReactNode } from 'react';
import * as S from './styled';

interface SidebarTableProps {
    headers: ReactNode;
    body: ReactNode;
    [prop:string]: any;
}

export default function SidebarTable({
    headers,
    body,
    ...props
}: SidebarTableProps) {

    return(
        <S.Root {...props}>
            <S.HeaderContainer>
                {headers}
            </S.HeaderContainer>
            <S.BodyContainer>
                {body}
            </S.BodyContainer>
        </S.Root>
    )
}