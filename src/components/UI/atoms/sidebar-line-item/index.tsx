import { openPanel } from '@/reducers/UI/panels.reducer';
import { GameEntity, RootState } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './styled';
import { merge } from 'lodash';
import { handleToggleFavorite, isInFavorites } from '@/utils/favorites.utils';
import { MAX_LEVEL } from '@/utils/constants.utils';

interface SidebarLineItemProps {
    content: {
        id: string;
        name: string;
        [other: string]: unknown;
    },
    contentType: GameEntity;
    [prop: string]: any;
}

export default function SidebarLineItem({
    content,
    contentType,
    ...props
}: SidebarLineItemProps) {

    const dispatch = useDispatch();

    const [animating, setAnimating] = useState(false);

    const [isFavorite, setIsFavorite] = useState( isInFavorites(content.id, contentType) )

    const panels = useSelector( (state:RootState) => state.UI.panels);

    const isActive = !!panels[content.id];

    const handleClick = useCallback( () => {
        if (Object.keys(panels).length < MAX_LEVEL) {
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

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleFavorite(content.id, contentType);
        setIsFavorite( isInFavorites(content.id, contentType) );
    }

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
            <S.Favorite 
                $isFavorited={isFavorite}
                onClick={(e) => handleFavorite(e)}
            />
        </S.Root>
    )
}