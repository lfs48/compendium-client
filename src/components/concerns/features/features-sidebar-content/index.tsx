import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { RootState } from '@/types';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import SidebarBodyRow from '../../../pages/dashboard/sidebar/sidebar-body-row';
import SidebarCell from '../../../pages/dashboard/sidebar/sidebar-cell';
import SidebarTableHeader from '../../../pages/dashboard/sidebar/sidebar-table-header';
import { apiEntityToClientEntity, sortEntities } from '@/utils/entities.utils';
import NoResults from '@/components/UI/no-results';
import SidebarTable from '../../../pages/dashboard/sidebar/sidebar-table';
import { apiFeatureKindToClientFeatureType, filterFeatures } from '@/utils/features.utils';
import { spaceship } from '@/utils/functions.utils';
import { Entity } from '@/enums';

export default function FeaturesSidebarContent({...props}) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {search, sort, filters} = sidebarState.features;
    const {field, dir} = sort;
    const {sourceType, source, kind, levelDir, level} = filters;

    const entities = useAppSelector( (state) => state.entities);
1
    const filtered = filterFeatures( Object.values(entities.features), {
        name: search,
        kind: kind,
        level: level,
        levelDir: levelDir,
        sourceType: sourceType,
        source: source
    })

    let sorted = filtered;

    if (field === 'source') {
        sorted = filtered.sort( (a,b) => {
            const sourceNames = ['', ''];
            [a,b].forEach( ({sources}, i) => {
                if (sources.length === 0) {
                    sourceNames[i] = '—';
                }
                if (sources.length > 1) {
                    sourceNames[i] = 'multiple';
                } else if (sources.length === 1) {
                    const {id, source_type} = sources[0];
                    const sourceType = apiEntityToClientEntity(source_type);
                    if (sourceType && sourceType in entities) {
                        sourceNames[i] = entities[sourceType][id].name.toLowerCase();
                    }
                }
            })
            return spaceship(sourceNames[0],sourceNames[1]) * dir;
        })
    } else if (field === 'name' || field === 'kind') {
        sorted = sortEntities(filtered, {
            field: field,
            dir: dir
        });
    }

    const rows = sorted.map( (feature) => {
        let source = '—';
        let length = feature.sources.length;
        if (feature.sources && feature.sources.length >= 1) {
            const {source_type, id} = feature.sources[0];
            const sourceType = apiEntityToClientEntity(source_type);
            if (length === 1 && sourceType && sourceType in entities) {
                const {name} = entities[sourceType][id];
                source = name;
            } else if (length >= 1) {
                source = 'Multiple';
            }
        }
        return(
            <SidebarBodyRow
                key={feature.id}
                id={feature.id}
                contentType={Entity.features}
            >
                <SidebarCell>{feature.name}</SidebarCell>
                <SidebarCell>{apiFeatureKindToClientFeatureType(feature.kind)}</SidebarCell>
                <SidebarCell>{source}</SidebarCell>
            </SidebarBodyRow>
        )
    })

    return(
        <SidebarTable
            headers={
                <SidebarTableHeader 
                    columns={[
                        {label: 'name', field: 'name'},
                        {label: 'type', field: 'kind'},
                        {label: 'source', field: 'source'}
                    ]}
                />
            }
            body={rows.length > 0 ? rows : <NoResults />}
            {...props}
        />
    )
}