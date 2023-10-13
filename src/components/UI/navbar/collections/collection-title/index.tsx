import { Collection } from '@/types';
import * as S from './styled';
import { useState } from 'react';
import Input from '@/components/UI/input';
import { usePatchCollectionMutation } from '@/api/collections.api';

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

    return(
        <S.Root {...props}>
        {editingTitle ?
            <>
            <S.TitleInput
                value={titleInput}
                onChange={(e)=>setTitleInput(e.target.value)}
            />
            <S.SaveIcon
                onClick={handleSave}
            />
            </>

        :
            <>
            <S.Title>{collection.title}</S.Title>
            <S.EditIcon
                onClick={()=>setEditingTitle(true)}
            />
            </>
        }
        </S.Root>
    )
}