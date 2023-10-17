import { Collection } from '@/types';
import * as S from './styled';
import { useState } from 'react';
import { usePatchCollectionMutation } from '@/api/collections.api';
import { useRecoilState } from 'recoil';
import { collectionMenuAtom } from '@/recoil';

interface CollectionTitleProps {
    collection: Collection;
    [prop: string]: any;
}

export default function CollectionTitle({
    collection,
    ...props
}: CollectionTitleProps) {

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleInput, setTitleInput] = useState(collection.title);

    const [collectionMenuState, setCollectionMenuState] = useRecoilState(collectionMenuAtom);

    const [triggerPatch, patchQuery] = usePatchCollectionMutation();

    const handleSave = () => {
        triggerPatch({
            collection: {
                id: collection.id,
                title: titleInput
            }
        })
        .unwrap()
        .then( res => {
            const {id} = res;
            setEditingTitle(false);
        })
        .catch( err => {
            console.log(err);
        })
    }

    const handleDelete = () => {
        setCollectionMenuState({
            ...collectionMenuState,
            deleting: true
        })
    }

    return(
        <S.Root {...props}>
            {editingTitle ?
                <S.TitleInput
                    value={titleInput}
                    onChange={(e)=>setTitleInput(e.target.value)}
                />
            :
                <S.Title>{collection.title}</S.Title>
            }
            <S.Right>
                {editingTitle ?
                    <S.SaveIcon
                        onClick={handleSave}
                    />

                :
                    <S.EditIcon
                        onClick={()=>setEditingTitle(true)}
                    />
                }
                <S.DeleteIcon onClick={handleDelete}/>
            </S.Right>
        </S.Root>
    )
}