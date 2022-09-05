import SidebarCell from '../../atoms/sidebar-cell';
import SidebarRow from '../../atoms/sidebar-row';
import { capitalize, merge } from 'lodash';
import * as S from './styled';
import ClickableIcon from '../../atoms/clickable-icon';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import { Icon } from '@/types';

interface SidebarTableHeaderProps {
    columns?: string[];
    [prop: string]: any;
}

export default function SidebarTableHeader({
    columns=['name'],
    ...props
}: SidebarTableHeaderProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const { selectedTab } = sidebarState;

    const handleSortButton = (column:string) => {
        const newState = merge({}, sidebarState);
        const currentCol = newState.sort[selectedTab].field;
        if (currentCol == column) {
            newState.sort[selectedTab].dir *= -1;
        } else {
            newState.sort[selectedTab].field = column;
            newState.sort[selectedTab].dir = 1;
        }
        setSidebarState(newState);
    }

    const headers = columns.map( (column) => {
        const currentCol = sidebarState.sort[selectedTab].field;
        const dir = sidebarState.sort[selectedTab].dir;
        let icon = 'fas fa-';
        if (currentCol == column) {
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
                key={column}
                onClick={()=>handleSortButton(column)}
            >
                <span>
                    {capitalize(column)}
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
