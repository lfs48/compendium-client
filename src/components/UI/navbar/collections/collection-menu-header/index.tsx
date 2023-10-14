import Label from '@/components/UI/label';
import * as S from './styled';
import { useRecoilState } from 'recoil';
import { collectionMenuAtom } from '@/recoil';

export default function CollectionMenuHeader({...props}) {

    const [collectionMenuState, setCollectionMenuState] = useRecoilState(collectionMenuAtom);

    const handleBack = () => {
        setCollectionMenuState({
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