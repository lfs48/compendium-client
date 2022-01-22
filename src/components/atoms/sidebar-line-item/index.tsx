import { openPanel } from '@/reducers/UI/panels.reducer';
import { RootState } from '@/types';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './styled';

interface SidebarLineItemProps {
    content: {
        id: string;
        name: string;
        [other: string]: unknown;
    },
    contentType: string;
    [prop: string]: any;
}

export default function SidebarLineItem({
    content,
    contentType,
    ...props
}: SidebarLineItemProps) {

    const dispatch = useDispatch();

    const [animating, setAnimating] = useState(false);

    const panels = useSelector( (state:RootState) => state.UI.panels);

    const isActive = !!panels[content.id];

    const handleClick = useCallback( () => {
        if (Object.keys(panels).length < 20) {
            dispatch({
                type: openPanel.type,
                payload: {
                    id: content.id,
                    panelType: contentType
                }
            })
        } else {
            setAnimating(true);
            setTimeout( () => {
                setAnimating(false);
            }, 300)
        }
    }, [content, contentType, panels])

    return(
        <S.Root
            $active={isActive}
            $animating={animating}
            onClick={handleClick}
            {...props}
        >
            <S.Name
                $animating={animating}
            >
                {content.name}
            </S.Name>
        </S.Root>
    )
}