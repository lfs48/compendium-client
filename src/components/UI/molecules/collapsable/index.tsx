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
    const [transitioning, setTransitioning] = useState(false);
    const [id, _] = useState(Math.random());
    //@ts-ignore
    const [height, setHeight] = useState(document.getElementById(`collapsable-${id}`)?.firstChild.offsetHeight)
    
    useEffect( () => {
        //@ts-ignore
        setHeight(document.getElementById(`collapsable-${id}`)?.firstChild?.offsetHeight);
    });

    const handleCollapseToggle = (bool) => {
        setTransitioning(true);
        setCollapsed(bool);
        setTimeout( () => {
            setTransitioning(false)
        }, 500);
    }

    return(
        <S.Root {...props}>
            <S.Header onClick={() => handleCollapseToggle(!collapsed)}>
                {header}
                <S.Arrow $collapsed={collapsed} />
            </S.Header>
        <S.Body 
            id={`collapsable-${id}`} 
            style={collapsed ? {height: 0} : {height: height}}
            $transitioning={transitioning}
        >
            {children}
        </S.Body>
    </S.Root>
    )
}