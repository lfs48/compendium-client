import Field from '@/components/common/field';
import { SyntheticEvent } from 'react';
import * as S from './styled';

interface SearchProps {
    value: string;
    onChange: (e:SyntheticEvent) => void;
    handleClearSearch: () => void;
    placeholder?: string;
    [prop: string]: any;
}

export default function Search({
    value,
    onChange,
    handleClearSearch,
    placeholder='Search',
    ...props
}: SearchProps) {
    return(
        <Field 
            value={value}
            onChange={onChange}
            leftIcon='fas fa-search'
            rightIcon='fas fa-times'
            handleClickRightIcon={handleClearSearch}
            placeholder={placeholder}
            inputContainerClasses={S.InputContainer}
            {...props}
        />
    )
}