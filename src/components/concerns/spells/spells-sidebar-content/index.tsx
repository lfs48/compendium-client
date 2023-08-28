import NoResults from '@/components/UI/atoms/no-results';
import SidebarBodyRow from '@/components/concerns/sidebar/sidebar-body-row';
import SidebarCell from '@/components/concerns/sidebar/sidebar-cell';
import SidebarTable from '@/components/concerns/sidebar/sidebar-table';
import SidebarTableHeader from '@/components/concerns/sidebar/sidebar-table-header';
import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import { compareEntities, sortEntities } from '@/utils/entities.utils';
import { isInFavorites } from '@/utils/favorites.utils';
import { filterSpells } from '@/utils/spells.util';
import { intToOrdinal, spaceship } from '@/utils/functions.utils';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';

interface SpellsSidebarContentProps {
    [prop: string]: any;
}

export default function SpellsSidebarContent({
    ...props
}: SpellsSidebarContentProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const { searchInputs, sort } = sidebarState;
    const { dir } = sort.spells;

    const {spells} = useSelector( (state:RootState) => ({
        spells: Object.values(state.entities.spells)
    }));

    const filtered = filterSpells(spells, searchInputs.spells.name, searchInputs.spells.dndClass);
    const sorted = sortEntities(filtered);
    const components = sorted
    .map( (spell) => {
        return(
            <SidebarBodyRow 
                key={spell.id}
                id={spell.id}
                contentType='spells'
            >
                <SidebarCell>{spell.name}</SidebarCell>
                <SidebarCell>{intToOrdinal(spell.rank)}</SidebarCell>
            </SidebarBodyRow>
        )
    })
    
    return(
        <SidebarTable {...props}>
            {filtered.length > 0 ?
                <>
                <SidebarTableHeader
                    columns={[
                        {label: 'name', field: 'name'},
                        {label: 'rank', field: 'rank'}
                    ]}
                />
                {components}
                </>
            :
                <NoResults />
            }
        </SidebarTable>
    )
}