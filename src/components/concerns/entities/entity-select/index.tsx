import Select from '@/components/UI/molecules/select';
import { GameEntity, RootState } from '@/types';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import * as S from './styled';

interface EntitySelectProps {
    value?: any;
    entityType: GameEntity;
    onChange: (event:ChangeEvent<HTMLSelectElement>) => void;
    [prop: string]: any;
}

export function EntitySelect({
    value=undefined,
    entityType,
    onChange,
    ...props
}: EntitySelectProps) {

    const entities = useSelector( (state:RootState) => state.entities[entityType]);
    let options = Object.values(entities)
    .map( (entity) => ({
        label: entity.name,
        value: entity.id
    }));

    return(
        <Select
            value={value}
            options={options}
            onChange={onChange}
            {...props}
        />
    )
}