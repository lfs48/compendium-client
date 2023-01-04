import NoResults from '@/components/UI/atoms/no-results';
import SidebarBodyRow from '@/components/UI/atoms/sidebar-body-row';
import SidebarCell from '@/components/UI/atoms/sidebar-cell';
import SidebarTable from '@/components/UI/atoms/sidebar-table';
import SidebarTableHeader from '@/components/UI/molecules/sidebar-table-header';
import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import { apiSourceTypeToGameEntity, compareEntities } from '@/utils/entities.utils';
import { isInFavorites } from '@/utils/favorites.utils';
import { filterBoons, sourceTypeToName } from '@/utils/boons.utils';
import { spaceship } from '@/utils/functions.utils';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';

interface BoonsSidebarContentProps {
    [prop: string]: any;
}

export default function BoonsSidebarContent({
    ...props
}: BoonsSidebarContentProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const { searchInputs, sort } = sidebarState;
    const { dir } = sort.boons;

    const {boons, sources} = useSelector( (state:RootState) => ({
        boons: Object.values(state.entities.boons),
        sources: {...state.entities.dndClasses, ...state.entities.races}
    }));

    const filtered = filterBoons(boons, searchInputs.boons.name, searchInputs.boons.source_id);
    const sorted = filtered.sort( (b1, b2) => {
        if (sort.boons.field === 'type') {
            return spaceship(b1.source_type, b2.source_type) * dir;
        } else if (sort.boons.field === 'source') {
            if ( !isInFavorites(b1.id) && isInFavorites(b2.id) ) {
                return 1;
            } else if ( isInFavorites(b1.id) && !isInFavorites(b2.id) ) {
                return -1;
            } else {
                if (b1.source_id && !b2.source_id) {
                    return dir;
                } else if (!b1.source_id && b2.source_id) {
                    return -1 * dir;
                } else if (b1.source_id && b2.source_id) {
                    const c1 = sources[b1.source_id].name;
                    const c2 = sources[b2.source_id].name;
                    const cSort = spaceship(c1, c2) * dir;
                    if (cSort === 0) {
                        return compareEntities(b1, b2);
                    } else {
                        return cSort;
                    }
                } else {
                    return 0;
                }
            }
        } else {
            return compareEntities(b1, b2, {dir: dir});
        }
    })
    const components = sorted
    .map( (boon) => {
        const sourceName = boon.source_id ? sources[boon.source_id].name : '—';
        return(
            <SidebarBodyRow 
                key={boon.id}
                id={boon.id}
                contentType='boons'
            >
                <SidebarCell>{boon.name}</SidebarCell>
                <SidebarCell>{sourceTypeToName(boon.source_type)}</SidebarCell>
                <SidebarCell>{sourceName}</SidebarCell>
            </SidebarBodyRow>
        )
    })
    
    return(
        <SidebarTable {...props}>
            {filtered.length > 0 ?
                <>
                <SidebarTableHeader
                    columns={['name', 'type', 'source']}
                />
                {components}
                </>
            :
                <NoResults />
            }
        </SidebarTable>
    )
}