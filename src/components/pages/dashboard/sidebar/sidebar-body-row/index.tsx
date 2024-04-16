import { openPanel } from '@/reducers/UI/panels.reducer';
import { ReactNode, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { Entity } from '@/enums';
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

    const panels = useAppSelector( (state) => state.UI.panels);

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