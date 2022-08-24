import ClickableIcon from '@/components/UI/atoms/clickable-icon';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import * as S from './styled';

interface FormFeatureListProps {
    featureIds: string[];
    handleRemove: (id:string) => void;
}

export default function FormFeatureList({
    featureIds,
    handleRemove
}: FormFeatureListProps) {

    const features = useSelector( (state: RootState) => state.entities.features);
    const sourceFeatures = featureIds.map( (id) => features[id]);

    const featureComponents = sourceFeatures.map( (feature) => {
        return(
            <S.Line key={feature.id}>
                <span>{feature.name}</span>
                <ClickableIcon 
                    icon='x'
                    onClick={() => handleRemove(feature.id)}
                />
            </S.Line>
        )
    })
    return(
        <S.Root>
            {featureComponents}
        </S.Root>
    )
}