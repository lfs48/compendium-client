import { openPanel } from '@/reducers/UI/panels.reducer';
import { RootState } from '@/types';
import { MAX_PANELS } from '@/utils/constants.utils';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './styled';
import { Entity } from '@/enums';
import Dropdown from '@/components/UI/dropdown';
import SidebarContextMenu from '../sidebar-context-menu';
import useClickOutside from '@/hooks/useClickOutside.hook';
import SidebarRow from '../sidebar-row';

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

    const [hovering, setHovering] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef(null);
    useClickOutside(menuRef, () => setMenuOpen(false) );

    const panels = useSelector( (state:RootState) => state.UI.panels);

    const isActive = !!panels[id];

    const handleOpenPanel = () => {
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
            $active={isActive || menuOpen}
            onMouseEnter={()=>setHovering(true)}
            onMouseLeave={()=>setHovering(false)}
            {...props}
        >
            <SidebarRow 
                onClick={handleOpenPanel}
            >
                {children}
            </SidebarRow>
            {hovering &&
                <S.ThreeDot onClick={()=>setMenuOpen(true)}/>
            }
            <SidebarContextMenu
                open={menuOpen}
                entityID={id}
                entityType={contentType}
                ref={menuRef}
            />
        </S.Root>
    )
}