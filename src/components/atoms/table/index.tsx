import { ReactNode } from 'react-markdown/lib/react-markdown';
import * as S from './styled';

interface TableProps {
    headers: ReactNode;
    rows: ReactNode;
    [prop: string]: any;
}

export default function Table({
    headers,
    rows,
    ...props
}: TableProps) {
    return(
        <S.Root {...props}>
            <S.Thead>
                {headers}
            </S.Thead>
            <S.TBody>
                {rows}
            </S.TBody>
        </S.Root>
    )
}