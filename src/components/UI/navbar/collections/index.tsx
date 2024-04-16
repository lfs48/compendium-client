import { useEffect, useRef, useState } from 'react';
import * as S from './styled';
import Dropdown from '../../dropdown';
import { useGetAllUserCollectionsQuery } from '@/api/collections.api';
import Loading from '../../loading';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { RootState } from '@/types';
import Label from '../../label';
import MenuCollection from './menu-collection';
import { useRecoilState } from 'recoil';
import { collectionMenuAtom } from '@/recoil';
import CollectionList from './collection-list';
import CollectionMenuHeader from './collection-menu-header';
import useClickOutside from '@/hooks/useClickOutside.hook';
import DeleteCollectionDialog from './delete-collection-dialog';

export default function Collections() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [collectionMenuState, setCollectionMenuState] = useRecoilState(collectionMenuAtom);
    const {deleting, selectedCollectionID} = collectionMenuState;

    const query = useGetAllUserCollectionsQuery();

    const menuRef = useRef(null);
    useClickOutside(menuRef, () => {
        if (!deleting) {
            setMenuOpen(false);
        }
    });

    const collections = useAppSelector( (state) => state.entities.collections);

    const handleClickMenu = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
    }

    return(
        <S.Root ref={menuRef}>
            <S.Icon
                onClick={()=>setMenuOpen(!menuOpen)}
            />
            <S.Menu
                open={menuOpen}
            >
            {query.isSuccess ?
                <>
                <CollectionMenuHeader />
                { (!!selectedCollectionID && !!collections[selectedCollectionID]) ?
                    <MenuCollection
                        collection={collections[selectedCollectionID]}
                    />
                :
                    <CollectionList />
                }
                </>
            :
                <Loading />
            }
            </S.Menu>
            {deleting &&
                <DeleteCollectionDialog
                    collectionID={selectedCollectionID || ''}
                />
            }
        </S.Root>
    )
}