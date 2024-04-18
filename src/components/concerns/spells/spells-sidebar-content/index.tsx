import NoResults from '@/components/common/no-results';
import SidebarBodyRow from '@/components/pages/dashboard/sidebar/sidebar-body-row';
import SidebarCell from '@/components/pages/dashboard/sidebar/sidebar-cell';
import SidebarTable from '@/components/pages/dashboard/sidebar/sidebar-table';
import SidebarTableHeader from '@/components/pages/dashboard/sidebar/sidebar-table-header';
import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import { compareEntities, sortEntities } from '@/utils/entities.utils';
import { filterSpells } from '@/utils/spells.util';
import { intToOrdinal, spaceship } from '@/utils/functions.utils';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { useRecoilState } from 'recoil';
import { Entity } from '@/enums';
import { useEffect, useState } from 'react';

interface SpellsSidebarContentProps {
    [prop: string]: any;
}

export default function SpellsSidebarContent({
    ...props
}: SpellsSidebarContentProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const { search, sort, filters } = sidebarState.spells;
    const { field, dir } = sort;
    const {rank, rankDir, description, aspects} = filters;

    const spells = useAppSelector( (state) => state.entities.spells );

    const filtered = filterSpells( Object.values(spells), {
        name: search,
        description:description,
        rank: rank,
        rankDir: rankDir,
        aspects: aspects
    })
    const sorted = sortEntities(filtered, {field: field, dir: dir});
    const components = sorted
    .map( (spell) => {
        return(
            <SidebarBodyRow 
                key={spell.id}
                id={spell.id}
                contentType={Entity.spells}
            >
                <SidebarCell>{spell.name}</SidebarCell>
                <SidebarCell>{intToOrdinal(spell.rank)}</SidebarCell>
            </SidebarBodyRow>
        )
    })
    
    return(
        <SidebarTable 
            headers={
                <SidebarTableHeader
                    columns={[
                        {label: 'name', field: 'name'},
                        {label: 'rank', field: 'rank'}
                    ]}
                />
            }
            body={filtered.length > 0 ? components : <NoResults />}
            {...props}
        />
    )
}