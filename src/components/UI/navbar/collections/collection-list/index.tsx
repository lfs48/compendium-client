import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { RootState } from '@/types';
import { useRecoilState } from 'recoil';
import { collectionMenuAtom } from '@/recoil';
import NewCollection from '../new-collection';

export default function CollectionList() {

    const collections = useAppSelector( (state) => state.entities.collections);
    const [collectionMenuState, setCollectionMenuState] = useRecoilState(collectionMenuAtom);

    const handleSelectCollection = (id:string) => {
        setCollectionMenuState({
            ...collectionMenuState,
            selectedCollectionID: id
        });
    }

    return(
        <S.Root>
            <NewCollection />
            <div>
            {Object.values(collections).map( ({id, title}) =>
                <S.Line
                    key={id}
                    onClick={()=>handleSelectCollection(id)}
                >
                    {title}
                </S.Line>
            )}
            </div>
        </S.Root>
    )
}