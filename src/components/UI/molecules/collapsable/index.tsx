import React, { ReactNode, useEffect, useState } from 'react';
import * as S from './styled';

interface CollapsableProps {
    header: ReactNode;
    children: ReactNode;
    [prop: string]: any;
}

export default function Collapsable({
    header, 
    children, 
    ...props
}: CollapsableProps) {

    const [collapsed, setCollapsed] = useState(false);

    return(
        <S.Root {...props}>
            <S.Header onClick={() => setCollapsed(!collapsed)}>
                {header}
                <S.Arrow $collapsed={collapsed} />
            </S.Header>
        <S.Body
            $collapsed={collapsed}
        >
            {children}
        </S.Body>
    </S.Root>
    )
}