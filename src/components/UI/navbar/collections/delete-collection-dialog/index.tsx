import { useDeleteCollectionMutation } from '@/api/collections.api';
import * as S from './styled';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { collectionMenuAtom } from '@/recoil';

export default function DeleteCollectionDialog({...props}) {

    const [collectionMenuState, setCollectionMenuState] = useRecoilState(collectionMenuAtom);
    const {deleting, selectedCollectionID} = collectionMenuState;

    const [triggerDelete, {isLoading}] = useDeleteCollectionMutation();

    const title = 'Delete this collection?';
    const body = 'This cannot be undone.';

    const handleConfirm = () => {
        if (selectedCollectionID) {
            triggerDelete(selectedCollectionID)
            .unwrap()
            .then( (res) => {
                setCollectionMenuState({
                    selectedCollectionID: null,
                    deleting: false
                })
                }
            )
            .catch( (err) => {
                console.log(err)
            })
        }
    };

    const handleCancel = () => {
        setCollectionMenuState({
            ...collectionMenuState,
            deleting: false
        })
    };

    return(
        <S.Root
            title={title}
            body={body}
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
            loading={isLoading}
            {...props}
        />
    )
}