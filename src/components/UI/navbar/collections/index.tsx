import { useEffect, useState } from 'react';
import * as S from './styled';
import Dropdown from '../../dropdown';
import { useGetAllUserCollectionsQuery } from '@/api/collections.api';
import Loading from '../../loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';
import Label from '../../label';
import MenuCollection from './menu-collection';
import { useRecoilState } from 'recoil';
import { collectionMenuAtom } from '@/recoil';
import CollectionList from './collection-list';
import CollectionMenuHeader from './collection-menu-header';

export default function Collections() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [collectionMenuState, setCollectionMenuState] = useRecoilState(collectionMenuAtom);
    const {selectedCollectionID} = collectionMenuState;

    const query = useGetAllUserCollectionsQuery();

    const collections = useSelector( (state:RootState) => state.entities.collections);

    useEffect( () => {
        if (menuOpen) {

            function closeMenu() {
                setMenuOpen(false);
            }

            window.addEventListener("click", closeMenu);
    
            return function cleanupMenuListener() {
                window.removeEventListener("click", closeMenu);
            }
        }
    }, [menuOpen]);

    const handleClickMenu = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
    }

    return(
        <S.Root onClick={handleClickMenu}>
            <S.Icon
                onClick={()=>setMenuOpen(!menuOpen)}
            />
                <S.Menu
                    open={menuOpen}
                >
                {query.isSuccess ?
                    <>
                    <CollectionMenuHeader />
                    {selectedCollectionID ?
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
        </S.Root>
    )
}