import { sidebarAtom } from '@/recoil';
import { GameEntity, RootState } from '@/types';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { filterEntities, sortEntities } from '@/utils/entities.utils';
import SidebarBodyRow from '@atoms/sidebar-body-row';
import SidebarCell from '@atoms/sidebar-cell';
import SidebarTable from '@atoms/sidebar-table';
import SidebarTableHeader from '@molecules/sidebar-table-header';
import NoResults from '@atoms/no-results';
import { editState } from '@/utils/component.utils';
import { useEffect } from 'react';
import { merge } from 'lodash';

interface EntitySidebarContentProps {
    entityType: GameEntity;
    [prop: string]: any;
}

export default function EntitySidebarContent({
    entityType,
    ...props
}: EntitySidebarContentProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {searchInputs, sort} = sidebarState;

    const entities = useSelector( (state:RootState) => Object.values(state.entities[entityType]) )

    const filtered = filterEntities(entities, searchInputs[entityType].name);
    const sorted = sortEntities(filtered, {dir: sort[entityType].dir})
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
        <SidebarTable {...props}>
            {filtered.length > 0 ?
                <>            
                <SidebarTableHeader />
                {components}
                </>
            :
                <NoResults />
            }
        </SidebarTable>
    )
}