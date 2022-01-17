import Field from '@molecules/field';
import { SyntheticEvent } from 'react';
import * as S from './styled';

interface SidebarHeaderProps {
    searchInput: string;
    handleSearch: (e:SyntheticEvent) => void;
    [prop: string]: any;
}

export default function SidebarHeader({
    searchInput,
    handleSearch,
    ...props
}: SidebarHeaderProps) {
    return(
        <S.Root {...props}>
            <Field 
                value={searchInput}
                onChange={handleSearch}
                icon='fas fa-search'
                iconSide='left'
                placeholder='Search'
                inputClasses='bg-gray-300 border-none'
            />
        </S.Root>
    )
}