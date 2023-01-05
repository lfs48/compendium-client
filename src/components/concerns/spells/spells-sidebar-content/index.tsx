import NoResults from '@/components/UI/atoms/no-results';
import SidebarBodyRow from '@/components/UI/atoms/sidebar-body-row';
import SidebarCell from '@/components/UI/atoms/sidebar-cell';
import SidebarTable from '@/components/UI/atoms/sidebar-table';
import SidebarTableHeader from '@/components/UI/molecules/sidebar-table-header';
import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import { compareEntities } from '@/utils/entities.utils';
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
    const sorted = filtered.sort( (s1, s2) => {
        if ( !isInFavorites(s1.id) && isInFavorites(s2.id) ) {
            return 1;
        } else if ( isInFavorites(s1.id) && !isInFavorites(s2.id) ) {
            return -1;
        } else {
            return compareEntities(s1, s2, {dir: dir, field: sort.spells.field});
        }
    })
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
                    columns={['name', 'rank']}
                />
                {components}
                </>
            :
                <NoResults />
            }
        </SidebarTable>
    )
}