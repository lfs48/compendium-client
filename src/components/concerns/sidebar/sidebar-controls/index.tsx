import { sidebarAtom } from '@/recoil';
import Search from '@molecules/search';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import SidebarFilters from '../sidebar-filters';
import Tooltip from '@/components/UI/atoms/tooltip';

interface SidebarControlsProps {
    [prop: string]: any;
}

export default function SidebarControls({
    ...props
}: SidebarControlsProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {filterOpen} = sidebarState.UI;
    const {selectedTab, searchInputs} = sidebarState;

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

    const setFilterState = (open:boolean) => {
        const newState = merge({}, sidebarState);
        newState.UI.filterOpen = open;
        setSidebarState(newState);
    }

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

    useEffect( () => {
        setFilterState(false);
    }, [selectedTab]);

    return(
        <>
        <S.Root {...props}>
            <S.Bottom>
                <Search
                    value={searchInputs[selectedTab].name}
                    onChange={handleNameInput}
                    handleClearSearch={handleClearNameInput}
                />
                <S.FiltersButton $show={isFilterable()} $open={filterOpen} onClick={()=>setFilterState(!filterOpen)} />
            </S.Bottom>
        </S.Root>
        <SidebarFilters
            tab={selectedTab}
        />
        </>
    )
}