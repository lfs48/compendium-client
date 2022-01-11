import Input from '@atoms/input';
import Label from '@atoms/label';
import ErrorList from '@molecules/error-list';
import { SyntheticEvent } from 'react';
import * as S from './styled';

interface FieldProps {
    value: string | number;
    type?: string;
    label?: string;
    onChange: (event:SyntheticEvent) => void;
    maxLength?: number;
    errors?: string[];
    hasErrors?: boolean;
    [prop:string]: any;
}

export default function Field({
    value,
    type='text',
    label,
    onChange,
    maxLength=20,
    errors=[],
    hasErrors=false,
    ...props
}: FieldProps) {
    return(
        <S.Root {...props}>
            {label &&
                <Label>{label}</Label>
            }
            <Input 
                value={value}
                type={type}
                onChange={onChange}
                maxLength={maxLength}
                hasErrors={errors.length >= 1 || hasErrors}
            />
            {(errors && errors.length > 0) &&
                <ErrorList errors={errors} />
            }
        </S.Root>
    )
}