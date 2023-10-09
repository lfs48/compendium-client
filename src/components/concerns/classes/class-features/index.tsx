import { DndClass } from '@/types';
import FeatureList from '@/components/concerns/features/features-list';
import * as S from './styled';
import { FeatureKind } from '@/enums';

interface ClassHitpointsProps {
    dndClass: DndClass;
    [prop: string]: any;
}

export default function ClassFeatures({
    dndClass,
    ...props
}: ClassHitpointsProps) {

    return(
        <S.Root {...props}>
            <h1>Class Features</h1>
            <p>{`As a ${dndClass.name.toLowerCase()}, you get the following class features.`}</p>
            <FeatureList
                featureIDs={dndClass.features}
                kind={FeatureKind.Core}
                sort='level'
            />
        </S.Root>
    )
}