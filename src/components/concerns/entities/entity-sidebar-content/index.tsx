import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { useRecoilState } from 'recoil';
import { filterEntities, sortEntities } from '@/utils/entities.utils';
import SidebarBodyRow from '@/components/pages/dashboard/sidebar/sidebar-body-row';
import SidebarCell from '@/components/pages/dashboard/sidebar/sidebar-cell';
import SidebarTable from '@/components/pages/dashboard/sidebar/sidebar-table';
import SidebarTableHeader from '@/components/pages/dashboard/sidebar/sidebar-table-header';
import NoResults from '@/components/common/no-results';
import { Entity } from '@/enums';

interface EntitySidebarContentProps {
    entityType: Entity;
    [prop: string]: any;
}

export default function EntitySidebarContent({
    entityType,
    ...props
}: EntitySidebarContentProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {search, sort} = sidebarState[entityType];

    const entities = useAppSelector( (state) => state.entities[entityType] )

    const filtered = filterEntities( Object.values(entities), search);
    const sorted = sortEntities(filtered, {dir: sort.dir})
    const components = sorted
    .map( (entity:any) =>
            <SidebarBodyRow
                key={entity.id}
                id={entity.id}
                contentType={entityType}
            >
                <SidebarCell>
                    {entity.name}
                </SidebarCell>
            </SidebarBodyRow>
    );

    return(
        <SidebarTable 
            headers={<SidebarTableHeader />}
            body={filtered.length > 0 ? components : <NoResults/>}
            {...props}
        />
    )
}