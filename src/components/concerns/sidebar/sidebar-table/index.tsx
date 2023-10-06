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
            {headers}
            {body}
        </S.Root>
    )
}