import Collapsable from '@/components/UI/molecules/collapsable';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import * as S from './styled';

interface FeaturesProps {
    feature_ids: string[];
    [prop: string]: any;
}

export default function Features({
    feature_ids,
    ...props
}: FeaturesProps) {

    const features = useSelector( (state:RootState) => state.entities.features );

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