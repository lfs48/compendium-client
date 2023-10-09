import Dropdown from '@/components/UI/dropdown';
import { RootState } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Field from '../../../UI/field';
import * as S from './styled';
import { Entity } from '@/enums';

interface EntityAutocompleteProps {
    label?: string;
    entityType: Entity;
    handleSelect: (id: string) => void;
    [prop: string]: any;
}

export default function EntityAutocomplete({
    label='',
    entityType, 
    handleSelect,
    ...props
}: EntityAutocompleteProps) {

    const [name, setName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const nameFilled = name.length >= 1;

    const {entities} = useSelector( (state:RootState) => ({
        entities: state.entities[entityType]
    }));

    const _handleSelect = useCallback( (id:string) => {
        handleSelect(id);
        setName('')
        setDropdownOpen(false);
    }, [handleSelect] )

    const filteredEntities = Object.values(entities)
    .filter( (entity:any) => nameFilled && entity.name.toLowerCase().startsWith(name.toLowerCase()) )
    .map( (entity:any) => {
        return(
            <S.Line
                key={entity.id}
                onMouseDown={() => _handleSelect(entity.id)}
            >
                {entity.name}
            </S.Line>
        );
    });

    useEffect( () => {
        if (nameFilled) {
            setDropdownOpen(true);
        }
    }, [name])

    return(
        <S.Root 
            {...props}
        >
            <Field
                label={label}
                value={name}
                onChange={(e:any) => setName(e.target.value)}
                className="w-full"
                onFocus={()=>setDropdownOpen(true)}
                onBlur={()=>setDropdownOpen(false)}
            />
            <Dropdown 
                open={dropdownOpen}
            >
                <S.List>
                    {filteredEntities}
                    { (nameFilled && filteredEntities.length < 1) &&
                        <S.Line>No matches</S.Line>
                    }
                </S.List>
            </Dropdown>
        </S.Root>
    )
}