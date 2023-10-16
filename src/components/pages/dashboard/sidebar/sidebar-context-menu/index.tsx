import { Entity } from '@/enums';
import * as S from './styled';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import CollectionSubmenu from './collection-submenu';
import { useMousePos } from '@/hooks/useMouse.hook';
import { createPortal } from 'react-dom';

interface SidebarContextMenuProps {
    open: boolean;
    entityID: string;
    entityType: Entity;
    [prop: string]: any;
}

function render({
    open,
    entityID,
    entityType,
    ...props
}: SidebarContextMenuProps, ref:ForwardedRef<any>) {

    const mousePos = useMousePos();


    const [collectionMenuOpen, setCollectionMenuOpen] = useState(false);
    const [pos, setPos] = useState({x:0,y:0});

    const handleOpenCollectionMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCollectionMenuOpen(true);
    }

    useEffect( () => {
        if (open) {
            setPos({
                x: mousePos.x + 15,
                y: mousePos.y
            });
        }
    }, [open])

    return(
        createPortal(
        <S.Root
            open={open}
            style={({left:pos.x,top:pos.y})}
            ref={ref}
            {...props}
        >
            <S.Content>
                <S.Line onClick={(e)=>handleOpenCollectionMenu(e)}>
                    <span>Add to Collection</span>
                    <S.Caret/>
                </S.Line>
                <CollectionSubmenu
                    open={collectionMenuOpen}
                    entityID={entityID}
                    entityType={entityType}
                />
            </S.Content>
        </S.Root>
    , document.getElementById('root') || document.body)
    )
}

const SidebarContextMenu = forwardRef(render);
export default SidebarContextMenu;