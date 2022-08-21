import * as S from './styled';
import EntityAutocomplete from '../../entities/entity-autocomplete';
import { MAX_LEVEL } from '@/utils/constants.utils';

interface ClassFormAddFeatureProps {
    handleAddFeature: (id:string) => void;
    [prop: string]: any;
}

export default function ClassFormAddFeature({
    handleAddFeature,
    ...props
}: ClassFormAddFeatureProps) {

    const _handleAddFeature = (id) => {
        handleAddFeature(id);
    }


    return(
        <S.Root {...props}>
            <EntityAutocomplete
                entityType='features'
                handleSelect={(id) => _handleAddFeature(id)}
            />
        </S.Root>
    )
}