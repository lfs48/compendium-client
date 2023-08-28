import { sidebarAtom } from '@/recoil';
import Search from '@molecules/search';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import SidebarFilters from '../sidebar-filters';

interface SidebarControlsProps {
    [prop: string]: any;
}

export default function SidebarControls({
    ...props
}: SidebarControlsProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {selectedTab, searchInputs} = sidebarState;

    const [filtersOpen, setFiltersOpen] = useState(false);

    const handleNameInput = (e) => {
        const newState = merge({}, sidebarState);
        newState.searchInputs[selectedTab].name = e.target.value;
        setSidebarState(newState);
    }

    const handleClearNameInput = () => {
        const newState = merge({}, sidebarState);
        newState.searchInputs[selectedTab].name = '';
        setSidebarState(newState);
    }

    useEffect( () => {
        setFiltersOpen(false);
    }, [selectedTab])

    const isFilterable = () => {
        switch(selectedTab) {
            case('features'):
            case('spells'):
            case('items'):
                return true;
            default:
                return false;
        }
    }

    return(
        <>
        <S.Root {...props}>
            <S.Bottom>
                <Search
                    value={searchInputs[selectedTab].name}
                    onChange={handleNameInput}
                    handleClearSearch={handleClearNameInput}
                />
                <S.FiltersButton $show={isFilterable()} onClick={()=>setFiltersOpen(!filtersOpen)}/>
            </S.Bottom>
        </S.Root>
        {isFilterable() && filtersOpen &&
            <SidebarFilters tab={selectedTab}/>
        }
        </>
    )
}