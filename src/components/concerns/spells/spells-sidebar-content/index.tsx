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

    const filtered = spells.filter( (spell) => {

        let rankMatch = true;
        if (rank) {
            if (rankDir === 0) {
                rankMatch = spell.rank === rank;
            } else {
                rankMatch = parseInt(spell.rank) * rankDir > parseInt(rank) * rankDir;
            }
        }

        let aspectMatch = true;
        if (aspects.length > 0) {
            aspectMatch = aspects.some( aspect => spell.aspects.includes(aspect) );
        }
        let descriptionMatch = true;
        if (description && description.length > 0) {
            descriptionMatch = spell.description.includes(description);
        }
        return rankMatch && aspectMatch && descriptionMatch;
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