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
    icon?: string;
    iconSide?: 'left' | 'right';
    placeholder?: string;
    inputClasses?: string;
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
    icon,
    iconSide='right',
    placeholder,
    inputClasses='',
    ...props
}: FieldProps) {
    return(
        <S.Root 
            {...props}
        >
            {label &&
                <Label>{label}</Label>
            }
            <S.InputContainer
                $hasErrors={errors.length >= 1 || hasErrors}
                $hasIcon={!!icon}
                $iconSide={iconSide}
                className={inputClasses}
            >
                <Input 
                    value={value}
                    type={type}
                    onChange={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    hasErrors={errors.length >= 1 || hasErrors}
                />
                {icon &&
                    <S.Icon 
                        $icon={icon}
                        $iconSide={iconSide}
                    />
                }
            </S.InputContainer>
            {(errors && errors.length > 0) &&
                <ErrorList errors={errors} />
            }
        </S.Root>
    )
}