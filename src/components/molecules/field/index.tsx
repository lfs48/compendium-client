import Input from '@atoms/input';
import Label from '@atoms/label';
import ErrorList from '@molecules/error-list';
import { SyntheticEvent, useState } from 'react';
import * as S from './styled';
import SearchField from './search-field';

interface FieldProps {
    value: string | number;
    type?: string;
    label?: string;
    onChange: (event:SyntheticEvent) => void;
    maxLength?: number;
    errors?: string[];
    hasErrors?: boolean;
    leftIcon?: string;
    handleClickLeftIcon?: () => void;
    rightIcon?: string;
    handleClickRightIcon?: () => void;
    placeholder?: string;
    inputContainerClasses?: string;
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
    leftIcon,
    handleClickLeftIcon,
    rightIcon,
    handleClickRightIcon,
    placeholder,
    inputContainerClasses='',
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
                $hasLeftIcon={!!leftIcon}
                $hasRightIcon={!!rightIcon}
                className={inputContainerClasses}
            >
                <Input 
                    value={value}
                    type={type}
                    onChange={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className={inputClasses}
                />
                {leftIcon &&
                    <S.Icon 
                        $icon={leftIcon}
                        $iconSide='left'
                        $isClickable={!!handleClickLeftIcon}
                        onClick={handleClickLeftIcon}
                    />
                }
                {rightIcon &&
                    <S.Icon 
                        $icon={rightIcon}
                        $iconSide='right'
                        $isClickable={!!handleClickRightIcon}
                        onClick={handleClickRightIcon}
                    />
                }
            </S.InputContainer>
            {(errors && errors.length > 0) &&
                <ErrorList errors={errors} />
            }
        </S.Root>
    )
}

export { SearchField };