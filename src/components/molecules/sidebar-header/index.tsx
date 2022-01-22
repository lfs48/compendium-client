import Button from '@/components/atoms/button';
import { SearchField } from '@molecules/field';
import { SyntheticEvent } from 'react';
import * as S from './styled';

interface SidebarHeaderProps {
    searchInput: string;
    handleSearch: (e:SyntheticEvent) => void;
    handleClearSearch: () => void;
    handleCreate: () => void;
    [prop: string]: any;
}

export default function SidebarHeader({
    searchInput,
    handleSearch,
    handleClearSearch,
    handleCreate,
    ...props
}: SidebarHeaderProps) {
    return(
        <S.Root {...props}>
            <SearchField 
                value={searchInput}
                onChange={handleSearch}
                handleClearSearch={handleClearSearch}
            />
            <Button
                onClick={handleCreate}
            >
                New
            </Button>
        </S.Root>
    )
}