import { DndClass, Feature, RootState } from '@/types';
import { useSelector } from 'react-redux';
import Collapsable from '@molecules/collapsable';
import Markdown from '@molecules/markdown';
import * as S from './styled';
import { intToOrdinal } from '@/utils/functions.utils';

interface ClassFeaturesProps {
    dndClass: DndClass;
    [prop: string]: any;
}

export default function ClassFeatures({
    dndClass,
    ...props
}: ClassFeaturesProps) {

    const {features} = useSelector( (state:RootState) => ({
        features: state.entities.features
    }));

    const classFeatures = [] as Feature[];
    const featureSections = dndClass.features
    .map( ({id, level}) => {
        const feature = features[id];
        classFeatures.push(feature);
        return(
            <Collapsable
                key={feature.id}
                header={
                    <span>
                        <S.Name>{feature.name}</S.Name>
                        <S.Level>({intToOrdinal(level || '')} level)</S.Level>
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