import TabIcon from '@/components/concerns/sidebar/tab-icon';
import TabName from '@/components/concerns/sidebar/tab-tooltip';
import { GameEntity } from '@/types';
import * as S from './styled';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import { editState } from '@/utils/component.utils';
import TabTooltip from '@/components/concerns/sidebar/tab-tooltip';

interface SidebarTabSelectProps {
    tab: GameEntity;
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
            <TabTooltip tab={tab}/>
        </S.Root>
    )
}