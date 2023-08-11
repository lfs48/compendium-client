import Label from '@atoms/label';
import ErrorList from '@molecules/error-list';
import { ChangeEvent, SyntheticEvent } from 'react';
import * as S from './styled';

interface SelectProps {
    value?: any;
    options: (string | number | Option)[];
    label?: string;
    onChange: (event:ChangeEvent<HTMLSelectElement>) => void;
    errors?: string[];
    hasErrors?: boolean;
    defaultInput?: string;
    allowNoneSelection?: boolean;
    disabled?: boolean;
    selectClasses?: string;
    [prop:string]: any;
}

interface Option {
    label: string;
    value: any;
}

export default function Select({
    value=undefined,
    options,
    label,
    onChange,
    errors=[],
    defaultInput='',
    allowNoneSelection=false,
    disabled=false,
    selectClasses='',
    ...props
}: SelectProps) {

    const optionComponents = options.map( (option, i) => {
        if (typeof option == 'string' || typeof option == 'number') {
            return(
                <S.Option
                    key={i}
                    value={option}
                >
                    {option}
                </S.Option>
            )
        } else {
            return(
                <S.Option
                    key={i}
                    value={option.value}
                >
                    {option.label}
                </S.Option>
            )
        }
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
                disabled={disabled}
                onChange={onChange}
                $hasErrors={errors.length >= 1}
                className={selectClasses}
            >
                {allowNoneSelection &&
                    <S.Option
                        key={-1}
                        value=''
                    >
                        —
                    </S.Option>
                }
                {optionComponents}
            </S.StyledSelect>
            {(errors && errors.length > 0) &&
                <ErrorList errors={errors} />
            }
        </S.Root>
    )
}