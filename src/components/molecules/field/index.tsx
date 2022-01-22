import Input from '@atoms/input';
import Label from '@atoms/label';
import ErrorList from '@molecules/error-list';
import { SyntheticEvent, useState } from 'react';
import * as S from './styled';
import SearchField from './search-field';
import TextArea from '@/components/atoms/textarea';

interface FieldProps {
    value: string | number;
    type?: 'text' | 'password' | 'textarea';
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
    defaultInput?: string;
    inputContainerClasses?: string;
    inputClasses?: string;
    [prop:string]: any;
}

export default function Field({
    value,
    type='text',
    label,
    onChange,
    maxLength=30,
    errors=[],
    hasErrors=false,
    leftIcon,
    handleClickLeftIcon,
    rightIcon,
    handleClickRightIcon,
    placeholder,
    defaultInput='',
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
                $isTextarea={type === 'textarea'}
                className={inputContainerClasses}
            >
                {type === 'textarea' ?
                    <TextArea
                        value={value}
                        onChange={onChange}
                        maxLength={5000}
                        placeholder={placeholder}
                        className={inputClasses}
                    />
                :
                    <Input 
                        value={value}
                        type={type}
                        onChange={onChange}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        default={defaultInput}
                        className={inputClasses}
                    />
                }
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