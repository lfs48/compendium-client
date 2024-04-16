import Collapsable from '@/components/UI/collapsable';
import * as S from './styled';
import { useAppSelector } from '@/hooks/useAppSelector.hook';

interface FeaturesProps {
    feature_ids: string[];
    [prop: string]: any;
}

export default function Features({
    feature_ids,
    ...props
}: FeaturesProps) {

    const features = useAppSelector( state => state.entities.features )

    const featureList = feature_ids.map( (id) => {
        const feature = features[id];
        return(
            <S.Feature
                key={id}
            >
                <Collapsable
                    header={
                        <S.FeatureHeader>{feature.name}</S.FeatureHeader>
                    }
                >
                    <span>{feature.description}</span>
                </Collapsable>
            </S.Feature>
        )
    })
    return(
        <S.Root {...props}>
            {featureList}
        </S.Root>
    )
}