import { Feature, RootState } from '@/types';
import * as S from './styled';
import { useSelector } from 'react-redux';
import { apiFeatureKindToClientFeatureType } from '@/utils/features.utils';
import { apiEntityToClientEntity } from '@/utils/entities.utils';

interface FeatureTaglineProps {
    feature: Feature;
    [prop:string]: any;
}

export default function FeatureTagline({
    feature,
    ...props
}: FeatureTaglineProps) {

    const entities = useSelector( (state:RootState) => state.entities);

    let str = '';
    if (feature.level) {
        str += `Level ${feature.level} `;
    }
    if (feature.sources.length === 1) {
        const {source_type, id} = feature.sources[0];
        const entityType = apiEntityToClientEntity(source_type);
        if (entityType && entityType in entities) {
            const firstSource = entities[entityType][id];
            str += firstSource.name + ' ';
        }
    } else if (feature.sources.length < 1) {
        str += `General `;
    }

    if (feature.kind === 'core') {
        str += ' Feature'
    } else {
        str += apiFeatureKindToClientFeatureType(feature.kind);
    }

    if (feature.sources.length > 1) {
        str += ' (Multiple Sources)'
    }

    return(
        <S.Root>
            {str}
        </S.Root>
    )
}