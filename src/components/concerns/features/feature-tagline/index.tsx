import { Feature, RootState } from '@/types';
import * as S from './styled';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { apiFeatureKindToClientFeatureType } from '@/utils/features.utils';
import { apiEntityToClientEntity } from '@/utils/entities.utils';
import { FeatureKind } from '@/enums';

interface FeatureTaglineProps {
    feature: Feature;
    [prop:string]: any;
}

export default function FeatureTagline({
    feature,
    ...props
}: FeatureTaglineProps) {

    const entities = useAppSelector( (state) => state.entities);

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

    if (feature.kind === FeatureKind.Core) {
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