import { useSelector } from 'react-redux';
import * as S from './styled';
import { RootState } from '@/types';
import { usePostCollectionMutation } from '@/api/collections.api';
import { useRecoilState } from 'recoil';
import { collectionMenuAtom } from '@/recoil';

export default function NewCollection() {

    const [collectionMenuState, setCollectionMenuState] = useRecoilState(collectionMenuAtom);

    const collectionsObj = useSelector( (state:RootState) => state.entities.collections );
    const collections = Object.values(collectionsObj);

    const [triggerPost, {isLoading}] = usePostCollectionMutation();

    const handleNew = () => {
        const title = `New Collection${collections.length > 1 ? ` ${collections.length + 1}` : ''}`;
        triggerPost({
            collection: {
                title: title,
                entities: []
            }
        })
        .unwrap()
        .then( (res) => {
            setCollectionMenuState({
                ...collectionMenuState,
                selectedCollectionID: res.id
            });
        })
        .catch( (err) => {
            console.log(err);
        })
    }

    return(
        <S.Root
            color='green'
            fill={false}
            loading={isLoading}
            onClick={handleNew}
        >
        <S.PlusIcon />
        <span>New Collection</span>
    </S.Root>
    )
}