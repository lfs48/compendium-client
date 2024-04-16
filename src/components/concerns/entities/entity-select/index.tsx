import Select from '@/components/UI/select';
import { RootState } from '@/types';
import { ChangeEvent } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { Entity } from '@/enums';

interface EntitySelectProps {
    value?: any;
    entityType?: Entity;
    onChange: (event:ChangeEvent<HTMLSelectElement>) => void;
    [prop: string]: any;
}

export function EntitySelect({
    value=undefined,
    entityType,
    onChange,
    ...props
}: EntitySelectProps) {

    const entities = useAppSelector( (state) => state.entities);
    let options = [] as {label:string, value:string}[];
    if (entityType) {
        options = Object.values(entities[entityType])
        .map( (entity) => ({
            label: entity.name,
            value: entity.id
        }));
    
    }

    return(
        <Select
            value={value}
            options={options}
            onChange={onChange}
            {...props}
        />
    )
}