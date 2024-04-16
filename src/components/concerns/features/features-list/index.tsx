import { DndClass, Feature, RootState } from '@/types';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import Collapsable from '@/components/UI/collapsable';
import Markdown from '@/components/UI/markdown';
import * as S from './styled';
import { intToOrdinal } from '@/utils/functions.utils';
import { sortEntities } from '@/utils/entities.utils';
import { FeatureKind } from '@/enums';

interface FeatureListProps {
    featureIDs: string[];
    kind?: FeatureKind;
    sort?: string;
    [prop: string]: any;
}

export default function FeaturesList({
    featureIDs,
    kind,
    sort,
    ...props
}: FeatureListProps) {

    const features = useAppSelector( (state) => state.entities.features);

    const featureList = featureIDs.map( (id) => features[id]);

    let filtered = featureList;
    if (kind) {
        filtered = featureList.filter( (feature) => feature.kind === kind);
    }
    if (sort) {
        filtered = sortEntities(filtered, {field: sort});
    }

    const featureSections = filtered
    .map( (feature) => {
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