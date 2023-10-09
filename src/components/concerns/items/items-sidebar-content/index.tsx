import { useSelector } from 'react-redux';
import * as S from './styled';
import { RootState } from '@/types';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import SidebarBodyRow from '../../sidebar/sidebar-body-row';
import SidebarCell from '../../sidebar/sidebar-cell';
import SidebarTableHeader from '../../sidebar/sidebar-table-header';
import { sortEntities } from '@/utils/entities.utils';
import NoResults from '@/components/UI/no-results';
import SidebarTable from '../../sidebar/sidebar-table';
import { bulkEnumToInt } from '@/utils/items.util';
import { Entity } from '@/enums';

export default function ItemsSidebarContent({...props}) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {search, sort, filters} = sidebarState.items;
    const {field, dir} = sort;
    const {kind, bulk, bulkDir, rarity, magic} = filters;

    const items = useSelector( (state:RootState) => state.entities.items);

    const filtered = Object.values(items).filter( (item) => {
        const nameMatch = item.name.toLowerCase().startsWith( search.toLowerCase() );
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
        return nameMatch && kindMatch && rarityMatch && magicMatch && bulkMatch;
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
                contentType={Entity.items}
            >
                <SidebarCell>{item.name}</SidebarCell>
            </SidebarBodyRow>
        )
    })

    return(
        <SidebarTable
            headers={
                <SidebarTableHeader 
                    columns={[
                        {label: 'name', field: 'name'},
                    ]}
                />
            }
            body={rows.length > 0 ? rows : <NoResults />}
            {...props}
        />
    )
}