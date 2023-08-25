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

    const handleSortButton = (field:string) => {
        const newState = merge({}, sidebarState);
        const currentCol = newState.sort[selectedTab].field;
        if (currentCol == field) {
            newState.sort[selectedTab].dir *= -1;
        } else {
            newState.sort[selectedTab].field = field;
            newState.sort[selectedTab].dir = 1;
        }
        setSidebarState(newState);
    }

    const headers = columns.map( ({label, field}) => {
        const currentCol = sidebarState.sort[selectedTab].field;
        const dir = sidebarState.sort[selectedTab].dir;
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
            <SidebarCell 
                key={field}
                onClick={()=>handleSortButton(field)}
            >
                <span>
                    {capitalize(label)}
                </span>
                <i
                    className={icon}
                />
            </SidebarCell>
        )
    });

    return(
        <SidebarRow {...props}>
            {headers}
        </SidebarRow>
    )
}
