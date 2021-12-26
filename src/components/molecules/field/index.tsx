import Input from '@atoms/input';
import Label from '@atoms/label';
import ErrorList from '@/components/molecules/error-list';
import { SyntheticEvent } from 'react';
import * as S from './styled';

interface FieldProps {
    value: string | number;
    type?: string;
    label?: string;
    onChange: (event:SyntheticEvent) => void;
    maxLength?: number;
    errors?: string[];
    [prop:string]: any;
}

export default function Field({
    value,
    type='text',
    label,
    onChange,
    maxLength=20,
    errors=[],
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
            {(errors && errors.length > 0) &&
                <ErrorList errors={errors} />
            }
        </S.Root>
    )
}