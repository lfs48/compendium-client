import Label from '@/components/common/label';
import * as S from './styled';
import { useRecoilState } from 'recoil';
import { collectionMenuAtom } from '@/recoil';

export default function CollectionMenuHeader({...props}) {

    const [collectionMenuState, setCollectionMenuState] = useRecoilState(collectionMenuAtom);

    const handleBack = () => {
        setCollectionMenuState({
            ...collectionMenuState,
            selectedCollectionID: null
        });
    }

    return(
        <S.Root {...props}>
            <Label>Collections</Label>
            {collectionMenuState.selectedCollectionID &&
                <S.Back onClick={handleBack}/>
            }
        </S.Root>
    )
}