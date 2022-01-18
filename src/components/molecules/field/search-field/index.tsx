import Field from '@molecules/field';
import { SyntheticEvent } from 'react';
import * as S from './styled';

interface SidebarHeaderProps {
    value: string;
    onChange: (e:SyntheticEvent) => void;
    handleClearSearch: () => void;
    placeholder?: string;
    [prop: string]: any;
}

export default function SearchField({
    value,
    onChange,
    handleClearSearch,
    placeholder='Search',
    ...props
}: SidebarHeaderProps) {
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