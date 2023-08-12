import NoResults from '@/components/UI/atoms/no-results';
import SidebarBodyRow from '@/components/concerns/sidebar/sidebar-body-row';
import SidebarCell from '@/components/concerns/sidebar/sidebar-cell';
import SidebarTable from '@/components/concerns/sidebar/sidebar-table';
import SidebarTableHeader from '@/components/concerns/sidebar/sidebar-table-header';
import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import { compareEntities } from '@/utils/entities.utils';
import { isInFavorites } from '@/utils/favorites.utils';
import { filterFeats } from '@/utils/feats.util';
import { spaceship } from '@/utils/functions.utils';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';

interface FeatsSidebarContentProps {
    [prop: string]: any;
}

export default function FeatsSidebarContent({
    ...props
}: FeatsSidebarContentProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const { searchInputs, sort } = sidebarState;
    const { dir } = sort.feats;

    const {feats, classes} = useSelector( (state:RootState) => ({
        feats: Object.values(state.entities.feats),
        classes: state.entities.dndClasses
    }));

    const filtered = filterFeats(feats, searchInputs.feats.name, searchInputs.feats.dndClass);
    const sorted = filtered.sort( (f1, f2) => {
        if (sort.feats.field == 'class') {
            if ( !isInFavorites(f1.id) && isInFavorites(f2.id) ) {
                return 1;
            } else if ( isInFavorites(f1.id) && !isInFavorites(f2.id) ) {
                return -1;
            } else {
                const c1 = classes[f1.dnd_class_id].name;
                const c2 = classes[f2.dnd_class_id].name;
                const cSort = spaceship(c1, c2) * dir;
                if (cSort === 0) {
                    return compareEntities(f1, f2);
                } else {
                    return cSort;
                }
            }
        } else {
            return compareEntities(f1, f2, {dir: dir});
        }
    })
    const components = sorted
    .map( (feat) => {
        const className = classes[feat.dnd_class_id].name;
        return(
            <SidebarBodyRow 
                key={feat.id}
                id={feat.id}
                contentType='feats'
            >
                <SidebarCell>{feat.name}</SidebarCell>
                <SidebarCell>{className}</SidebarCell>
            </SidebarBodyRow>
        )
    })
    
    return(
        <SidebarTable {...props}>
            {filtered.length > 0 ?
                <>
                <SidebarTableHeader
                    columns={['name', 'class']}
                />
                {components}
                </>
            :
                <NoResults />
            }
        </SidebarTable>
    )
}