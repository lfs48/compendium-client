import { DndClass, Feature, RootState } from '@/types';
import { useSelector } from 'react-redux';
import Collapsable from '@molecules/collapsable';
import Markdown from '@molecules/markdown';
import * as S from './styled';
import { intToOrdinal } from '@/utils/functions.utils';

interface FeatureListProps {
    source: {
        features: string[];
        [others: string]: any;
    };
    [prop: string]: any;
}

export default function FeaturesList({
    source,
    ...props
}: FeatureListProps) {

    const {features} = useSelector( (state:RootState) => ({
        features: state.entities.features
    }));

    const featureSections = source.features
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