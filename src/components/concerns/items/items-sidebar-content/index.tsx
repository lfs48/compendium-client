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
import { bulkEnumToInt } from '@/utils/items.util';

export default function ItemsSidebarContent() {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {field, dir} = sidebarState.sort.items;

    const items = useSelector( (state:RootState) => state.entities.items);

    const filtered = Object.values(items).filter( (item) => {
        const {kind, bulk, bulkDir, rarity, magic} = sidebarState.filters.items;
        const kindMatch = kind ? kind === item.kind : true;
        const rarityMatch = rarity ? rarity === item.rarity : true;
        const magicMatch = magic ? magic === item.magic.toString() : true;
        let bulkMatch = true;
        if (bulk) {
            const filterBulkNum = bulkEnumToInt(bulk);
            const itemBulkNum = bulkEnumToInt(item.bulk);
            if (bulkDir === '=') {
                bulkMatch = itemBulkNum === filterBulkNum;
            } else if (bulkDir === '>') {
                bulkMatch = itemBulkNum > filterBulkNum;
            } else if (bulkDir === '<') {
                bulkMatch = itemBulkNum < filterBulkNum;
            }
        }
        return kindMatch && rarityMatch && magicMatch && bulkMatch;
    });

    const sorted = sortEntities(filtered, {
        field: field,
        dir: dir
    });;

    const rows = sorted.map( (item) => {
        return(
            <SidebarBodyRow
                key={item.id}
                id={item.id}
                contentType='items'
            >
                <SidebarCell>{item.name}</SidebarCell>
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