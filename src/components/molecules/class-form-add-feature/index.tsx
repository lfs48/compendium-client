import * as S from './styled';
import EntityAutocomplete from '../entity-autocomplete';
import { useState } from 'react';
import Select from '../select';
import { handleInput } from '@/utils/component.utils';

const levelOptions = [...Array(20).keys()].map(n => n+1);

interface ClassFormAddFeatureProps {
    handleAddFeature: (id:string, level:number) => void;
    [prop: string]: any;
}

export default function ClassFormAddFeature({
    handleAddFeature,
    ...props
}: ClassFormAddFeatureProps) {

    const [inputs, setInputs] = useState({
        level: '1'
    });

    const _handleAddFeature = (id) => {
        handleAddFeature(id, parseInt(inputs.level));
    }


    return(
        <S.Root {...props}>
            <EntityAutocomplete
                entityType='features'
                handleSelect={(id) => _handleAddFeature(id)}
            />
            <Select
                label='Level'
                value={inputs.level}
                onChange={(e) => handleInput(e, 'level', inputs, setInputs)}
                options={levelOptions}
            />
        </S.Root>
    )
}