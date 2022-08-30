import { RootState } from '@/types';
import Button from '@atoms/button';
import Search from '@molecules/search';
import { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { EntitySelect } from '../../entities/entity-select';
import * as S from './styled';

interface SidebarHeaderProps {
    searchInput: SearchInput;
    handleSearch: (e:SyntheticEvent) => void;
    handleClearSearch: () => void;
    handleCreate: () => void;
    [prop: string]: any;
}

interface SearchInput {
    name: string;
    dndclass: string;
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
                value={searchInput.name}
                onChange={handleSearch}
                handleClearSearch={handleClearSearch}
            />
            <EntitySelect
                value={undefined}
                entityType='dndClasses'
                onChange={()=>{}}
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