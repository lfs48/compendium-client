import { useSelector } from 'react-redux';
import * as S from './styled';
import { Collection, RootState } from '@/types';
import { Entity } from '@/enums';
import { usePatchCollectionMutation, usePostCollectionMutation } from '@/api/collections.api';
import { merge } from 'lodash';
import { clientEntityToAPIEntity } from '@/utils/entities.utils';
import { useRecoilState } from 'recoil';
import { collectionMenuAtom } from '@/recoil';
import Checkbox from '@/components/UI/checkbox';
import { collectionContainsEntity } from '@/utils/collections.utils';

interface CollectionSubmenuProps {
    open: boolean;
    entityID: string;
    entityType: Entity;
    [prop: string]: any;
}

export default function CollectionSubmenu({
    open,
    entityID,
    entityType,
    ...props
}: CollectionSubmenuProps) {

    const [collectionMenuState, setCollectionMenuState] = useRecoilState(collectionMenuAtom);

    const collections = useSelector( (state:RootState) => Object.values(state.entities.collections));

    const [postTrigger, postQuery] = usePostCollectionMutation();
    const [patchTrigger, patchQuery] = usePatchCollectionMutation();

    const handleCreateCollection = () => {
        const newTitle = `New Collection${collections.length > 1 ? ` ${collections.length + 1}` : ''}`;
        const newEntities = [{
            id: entityID,
            entity_type: clientEntityToAPIEntity(entityType)
        }];
        postTrigger({
            collection: {
                title: newTitle,
                entities: newEntities
            }
        })
        .unwrap()
        .then( (res) => console.log(res))
        .catch( (err) => console.log(err) )
    }

    const handleToggleCollection = (collection:Collection) => {
        let newEntities = merge([],collection.entities);
        if ( collectionContainsEntity(collection, entityID) ) {
            newEntities = newEntities.filter( (e) => e.id !== entityID);
        } else {
            newEntities.push({
                id: entityID,
                entity_type: clientEntityToAPIEntity(entityType)
            });
        }
        patchTrigger({
            collection: {
                id: collection.id,
                entities: newEntities
            }
        })
        .unwrap()
        .then( (res) => console.log(res))
        .catch( (err) => console.log(err) )
    }

    return(
        <S.Root
            open={open}
            {...props}
        >
            <S.Line onClick={handleCreateCollection}>Create a collection</S.Line>
            {collections.map( (collection) => (
                <S.Line 
                    key={collection.id}
                    onClick={()=>handleToggleCollection(collection)}
                >
                    <Checkbox
                        checked={ collectionContainsEntity(collection, entityID) }
                    />
                    <div>{collection.title}</div>
                </S.Line>
            ))}
        </S.Root>
    )
}