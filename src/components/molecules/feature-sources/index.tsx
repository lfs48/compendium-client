import EntityLink from '@/components/atoms/entity-link';
import { Feature, GameEntity, RootState } from '@/types';
import { apiSourceTypeToGameEntity } from '@/utils/entities.utils';
import { useSelector } from 'react-redux';
import * as S from './styled';

interface FeatureSourcesProps {
    feature: Feature;
    [prop: string]: any;
}

export default function FeatureSources({
    feature,
    ...props
}: FeatureSourcesProps) {

    const entities = useSelector( (state:RootState) => state.entities);

    const sources = feature.sources
    .map( ({id, source_type}) => {
        const entityType = apiSourceTypeToGameEntity(source_type);
        if (entityType && entityType in entities && id in entities[entityType]) {
            const {name} = entities[entityType][id];
            return(
                <EntityLink 
                    key={id}
                    id={id}
                    entityType={entityType}
                >
                    {name}
                </EntityLink>
            )
        }
    })

    return(
        <S.Root {...props}>
            <h2>Sources:</h2>
            {sources}
        </S.Root>
    )
}