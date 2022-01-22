import { openPanel } from '@/reducers/UI/panels.reducer';
import { RootState } from '@/types';
import { useCallback } from 'react';
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

    const panels = useSelector( (state:RootState) => state.UI.panels);

    const isActive = !!panels[content.id];

    const handleClick = useCallback( () => {
        dispatch({
            type: openPanel.type,
            payload: {
                id: content.id,
                panelType: contentType
            }
        })
    }, [content, contentType])

    return(
        <S.Root
            $active={isActive}
            onClick={handleClick}
            {...props}
        >
            <S.Name>{content.name}</S.Name>
        </S.Root>
    )
}