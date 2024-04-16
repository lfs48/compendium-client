import ClickableIcon from '@/components/UI/clickable-icon';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { Icon } from '@/enums';

interface FormFeatureListProps {
    featureIds: string[];
    handleRemove: (id:string) => void;
}

export default function FormFeatureList({
    featureIds,
    handleRemove
}: FormFeatureListProps) {

    const features = useAppSelector( (state) => state.entities.features);
    const sourceFeatures = featureIds.map( (id) => features[id]);

    const featureComponents = sourceFeatures.map( (feature) => {
        return(
            <S.Line key={feature.id}>
                <span>{feature.name}</span>
                <ClickableIcon 
                    icon={Icon.X}
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