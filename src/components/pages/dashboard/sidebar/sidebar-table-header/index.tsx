import SidebarCell from '../sidebar-cell';
import SidebarRow from '../sidebar-row';
import { capitalize, merge } from 'lodash';
import * as S from './styled';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';

interface SidebarTableHeaderProps {
    columns?: Column[];
    [prop: string]: any;
}

interface Column {
    label: string;
    field: string;
}

export default function SidebarTableHeader({
    columns=[{
        label: 'name',
        field: 'name'
    }],
    ...props
}: SidebarTableHeaderProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const { selectedTab } = sidebarState;
    const {sort} = sidebarState[selectedTab];

    const handleSortButton = (field:string) => {
        const newState = merge({}, sidebarState);
        const {sort} = newState[selectedTab];
        const currentCol = sort.field;
        if (currentCol && currentCol == field) {
            newState[selectedTab].sort.dir *= -1;
        } else {
            newState[selectedTab].sort.field = field;
            newState[selectedTab].sort.dir = 1;
        }
        setSidebarState(newState);
    }

    const headers = columns.map( ({label, field}) => {
        const currentCol = sort.field;
        const dir = sort.dir;
        let icon = 'fas fa-';
        if (currentCol === field) {
            if (dir == 1) {
                icon += 'caret-down';
            }
            if (dir == -1) {
                icon += 'caret-up';
            }
            if (dir == 0) {
                icon = '';
            }
        }
        return(
            <S.HeaderCell 
                key={field}
                onClick={()=>handleSortButton(field)}
            >
                <span>
                    {capitalize(label)}
                </span>
                <i
                    className={icon}
                />
            </S.HeaderCell>
        )
    });

    return(
        <S.Root {...props}>
            {headers}
        </S.Root>
    )
}
