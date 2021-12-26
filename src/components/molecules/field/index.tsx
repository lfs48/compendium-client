import Input from '@atoms/input';
import Label from '@atoms/label';
import { SyntheticEvent } from 'react';
import * as S from './styled';

interface FieldProps {
    value: string | number;
    type?: string;
    label?: string;
    onChange: (event:SyntheticEvent) => void;
    maxLength?: number;
    [prop:string]: any;
}

export default function Field({
    value,
    type='text',
    label,
    onChange,
    maxLength=20,
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
            />
        </S.Root>
    )
}