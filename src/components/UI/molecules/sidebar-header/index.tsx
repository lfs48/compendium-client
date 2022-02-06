import { RootState } from '@/types';
import Button from '@atoms/button';
import Search from '@molecules/search';
import { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
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

    const gm = useSelector( (state:RootState) => state.session.gm);

    return(
        <S.Root {...props}>
            <Search
                value={searchInput}
                onChange={handleSearch}
                handleClearSearch={handleClearSearch}
            />
            {gm &&
                <Button
                    onClick={handleCreate}
                >
                    New
                </Button>
            }
        </S.Root>
    )
}