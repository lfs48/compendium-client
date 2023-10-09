import TabIcon from '@/components/pages/dashboard/sidebar/tab-icon';
import * as S from './styled';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import { editState } from '@/utils/component.utils';
import { entityName } from '@/utils/entities.utils';
import { Entity } from '@/enums';

interface SidebarTabSelectProps {
    tab: Entity;
    [prop: string]: any;
}

export default function SidebarTabSelect({
    tab,
    ...props
}: SidebarTabSelectProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);

    const selected = sidebarState.selectedTab === tab;

    return(
        <S.Root
            $selected={selected}
            onClick={() => editState(tab, 'selectedTab', sidebarState, setSidebarState)}
            {...props}
        >
            <TabIcon 
                tab={tab}
                selected={selected}
            />
            <S.Tooltip
                dir='right'
                children={
                    <div>{entityName(tab)}</div>
                }
            />
        </S.Root>
    )
}