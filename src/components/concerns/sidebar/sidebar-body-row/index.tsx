import { openPanel } from '@/reducers/UI/panels.reducer';
import { RootState } from '@/types';
import { MAX_PANELS } from '@/utils/constants.utils';
import { handleToggleFavorite, isInFavorites } from '@/utils/favorites.utils';
import { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './styled';
import { Entity } from '@/enums';

interface SidebarBodyRowProps {
    id: string;
    contentType: Entity;
    children: ReactNode;
    [prop: string]: any;
}

export default function SidebarBodyRow({
    id,
    contentType,
    children,
    ...props
}: SidebarBodyRowProps) {

    const dispatch = useDispatch();

    const [isFavorite, setIsFavorite] = useState( isInFavorites(id) )

    const panels = useSelector( (state:RootState) => state.UI.panels);

    const isActive = !!panels[id];

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleFavorite(id);
        setIsFavorite( isInFavorites(id) );
    }

    const handleClick = () => {
        dispatch({
            type: openPanel.type,
            payload: {
                id: id,
                panelType: contentType
            }
        })
    }

    return(
        <S.Root 
            $active={isActive}
            onClick={handleClick}
            {...props}
        >
            {children}
            <S.Favorite
                $isFavorited={isFavorite}
                onClick={(e) => handleFavorite(e)}
            />
        </S.Root>
    )
}