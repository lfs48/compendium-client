import { useSelector } from 'react-redux';
import * as S from './styled';
import { RootState } from '@/types';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import SidebarBodyRow from '../../sidebar/sidebar-body-row';
import SidebarCell from '../../sidebar/sidebar-cell';
import SidebarTableHeader from '../../sidebar/sidebar-table-header';
import { apiSourceTypeToGameEntity, sortEntities } from '@/utils/entities.utils';
import NoResults from '@/components/UI/atoms/no-results';
import SidebarTable from '../../sidebar/sidebar-table';
import { apiFeatureKindToClientFeatureType } from '@/utils/features.utils';
import { spaceship } from '@/utils/functions.utils';

export default function FeaturesSidebarContent() {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {field, dir} = sidebarState.sort.features;

    const {features, entities} = useSelector( (state:RootState) => ({
        features: state.entities.features,
        entities: state.entities
    }));

    const filtered = Object.values(features).filter( (feature) => {
        const {sourceType, source, kind, levelDir, level} = sidebarState.filters.features;
        let kindMatch = true;
        if (kind) {
            kindMatch = feature.kind === kind;
        }
        let sourceTypeMatch = true;
        if (sourceType) {
            sourceTypeMatch = feature.sources.some( (source) => source.source_type === sourceType );
        }
        let sourceMatch = true;
        if (sourceType && source) {
            sourceMatch = feature.sources.some( (s) => source === s.id );
        }
        let levelMatch = true;
        if (level) {
            if (feature.level) { 
                if (levelDir === '=') {
                    levelMatch = feature.level === level;
                } else if (levelDir === '>') {
                    levelMatch = feature.level > level;
                } else if (levelDir === '<') {
                    levelMatch = feature.level < level;
                }
            } else {
                return false;
            }
        }
        return kindMatch && sourceTypeMatch && sourceMatch && levelMatch;
    });

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
                    const sourceType = apiSourceTypeToGameEntity(source_type);
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
            const sourceType = apiSourceTypeToGameEntity(source_type);
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
                contentType='features'
            >
                <SidebarCell>{feature.name}</SidebarCell>
                <SidebarCell>{apiFeatureKindToClientFeatureType(feature.kind)}</SidebarCell>
                <SidebarCell>{source}</SidebarCell>
            </SidebarBodyRow>
        )
    })

    return(
        <SidebarTable>
            {rows.length > 0 ?
                <>
                <SidebarTableHeader 
                    columns={[
                        {label: 'name', field: 'name'},
                        {label: 'type', field: 'kind'},
                        {label: 'source', field: 'source'}
                    ]}
                />
                {rows}
                </>
            :
                <NoResults />
            }
        </SidebarTable>
    )
}