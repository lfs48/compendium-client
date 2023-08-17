import { useSelector } from 'react-redux';
import * as S from './styled';
import { RootState } from '@/types';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import SidebarBodyRow from '../../sidebar/sidebar-body-row';
import SidebarCell from '../../sidebar/sidebar-cell';
import SidebarTableHeader from '../../sidebar/sidebar-table-header';
import { apiSourceTypeToGameEntity } from '@/utils/entities.utils';
import NoResults from '@/components/UI/atoms/no-results';
import SidebarTable from '../../sidebar/sidebar-table';

export default function FeaturesSidebarContent() {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);

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

    const rows = filtered.map( (feature) => {
        let source = '—';
        let length = feature.sources.length;
        if (feature.sources) {
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
                <SidebarCell>{feature.kind}</SidebarCell>
                <SidebarCell>{source}</SidebarCell>
            </SidebarBodyRow>
        )
    })

    return(
        <SidebarTable>
            {rows.length > 0 ?
                <>
                <SidebarTableHeader 
                    columns={['name','type','source']}
                />
                {rows}
                </>
            :
                <NoResults />
            }
        </SidebarTable>
    )
}