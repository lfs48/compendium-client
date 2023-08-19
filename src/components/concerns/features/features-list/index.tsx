import { DndClass, Feature, RootState } from '@/types';
import { useSelector } from 'react-redux';
import Collapsable from '@molecules/collapsable';
import Markdown from '@molecules/markdown';
import * as S from './styled';
import { intToOrdinal } from '@/utils/functions.utils';

interface FeatureListProps {
    featureIDs: string[];
    kind?: 'core' | 'major' | 'minor';
    [prop: string]: any;
}

export default function FeaturesList({
    featureIDs,
    kind,
    ...props
}: FeatureListProps) {

    const {features} = useSelector( (state:RootState) => ({
        features: state.entities.features
    }));

    let filtered = featureIDs;
    if (kind) {
        filtered = featureIDs.filter( (id) => features[id].kind === kind);
    }

    const featureSections = filtered
    .map( (id) => {
        const feature = features[id];
        return(
            <Collapsable
                key={feature.id}
                header={
                    <span>
                        <S.Name>{feature.name}</S.Name>
                        {feature.level &&
                            <S.Level>({intToOrdinal(feature.level || '')} level)</S.Level>
                        }
                    </span>
                }
            >
                <Markdown>
                    {feature.description}
                </Markdown>
            </Collapsable>
        )
    });

    return(
        <S.Root {...props}>
            {featureSections}
        </S.Root>
    )
}