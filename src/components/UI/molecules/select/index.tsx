import Label from '@atoms/label';
import ErrorList from '@molecules/error-list';
import { SyntheticEvent } from 'react';
import * as S from './styled';

interface SelectProps {
    value: string | number;
    options: string[] | number[];
    label?: string;
    onChange: (event:SyntheticEvent) => void;
    errors?: string[];
    hasErrors?: boolean;
    defaultInput?: string;
    [prop:string]: any;
}

export default function Select({
    value,
    options,
    label,
    onChange,
    errors=[],
    defaultInput='',
    ...props
}: SelectProps) {

    const optionComponents = options.map( (option) => {
        return(
            <S.Option
                key={option}
            >
                {option}
            </S.Option>
        )
    })

    return(
        <S.Root 
            {...props}
        >
            {label &&
                <Label>{label}</Label>
            }
            <S.StyledSelect 
                value={value}
                onChange={onChange}
                $hasErrors={errors.length >= 1}
            >
                {optionComponents}
            </S.StyledSelect>
            {(errors && errors.length > 0) &&
                <ErrorList errors={errors} />
            }
        </S.Root>
    )
}