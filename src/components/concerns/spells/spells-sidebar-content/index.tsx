import NoResults from '@/components/UI/no-results';
import SidebarBodyRow from '@/components/pages/dashboard/sidebar/sidebar-body-row';
import SidebarCell from '@/components/pages/dashboard/sidebar/sidebar-cell';
import SidebarTable from '@/components/pages/dashboard/sidebar/sidebar-table';
import SidebarTableHeader from '@/components/pages/dashboard/sidebar/sidebar-table-header';
import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import { compareEntities, sortEntities } from '@/utils/entities.utils';
import { isInFavorites } from '@/utils/favorites.utils';
import { filterSpells } from '@/utils/spells.util';
import { intToOrdinal, spaceship } from '@/utils/functions.utils';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { Entity } from '@/enums';

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

    const {spells} = useSelector( (state:RootState) => ({
        spells: Object.values(state.entities.spells)
    }));

    const filtered = filterSpells(spells, {
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