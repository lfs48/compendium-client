import { Collection } from '@/types';
import * as S from './styled';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { apiEntityToClientEntity, entityName } from '@/utils/entities.utils';
import Collapsable from '@/components/common/collapsable';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { Entity } from '@/enums';
import CollectionTitle from '../collection-title';

interface CollectionProps {
    collection: Collection;
    [prop: string]: any;
}

export default function MenuCollection({
    collection,
    ...props
}: CollectionProps) {

    const dispatch = useDispatch();

    const entities = useAppSelector( (state) => state.entities);

    const entitiesBytype = {};
    Object.values(Entity).forEach( (key) => {
        entitiesBytype[key] = collection.entities
        .filter( ({entity_type}) => apiEntityToClientEntity(entity_type) === key)
        .map( ({id, entity_type}) => {
            const entityType = apiEntityToClientEntity(entity_type);
            if (entityType in entities && id in entities[entityType]) {
                const entity = entities[entityType][id];
                return(
                    <S.PanelLink 
                        key={id}
                        onClick={()=>handleOpen(id, entityType)}
                    >
                        {entity.name}
                    </S.PanelLink>
                )
            }
        })
    });

    const handleOpen = (id, entityType) => {
        dispatch({
            type: openPanel.type,
            payload: {
                id: id,
                panelType: entityType
            }
        })
    }

    return(
        <S.Root {...props}>
            <CollectionTitle collection={collection} />
            {
                Object.values(Entity).map( (key) => {
                    const typeEntities = entitiesBytype[key];
                    if (typeEntities.length > 0) {
                        return(
                            <Collapsable
                                key={key}
                                header={<S.SectionHeader>{entityName(key)}</S.SectionHeader>}
                            >
                                <S.SectionContent>
                                    {entitiesBytype[key]}
                                </S.SectionContent>
                            </Collapsable>
                        )
                    }
                })
            }
        </S.Root>
    )
}