import Loading from '@/components/common/loading';
import SidebarControls from '@/components/pages/dashboard/sidebar/sidebar-controls';
import SidebarTabSelect from '@/components/pages/dashboard/sidebar/sidebar-tab-select';
import { RootState } from '@/types';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import SidebarContent from '@/components/pages/dashboard/sidebar/sidebar-content';
import SidebarHide from './sidebar-hide';
import { Entity } from '@/enums';
import { useGetAllEntitiesQuery } from '@/api/entities.api';
import SidebarLoadingContent from './sidebar-loading-content';

export default function Sidebar() {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {selectedTab} = sidebarState;

    const { isSuccess } = useGetAllEntitiesQuery();

    const entities = ['dndClasses', 'features', 'races', 'items', 'spells'];

    const tabSelectors = entities.map( (key) => {
        const tab = key as Entity;
        return(
            <SidebarTabSelect 
                key={tab}
                tab={tab}
            />
        )
    });

    return(
        <S.Root $open={sidebarState.UI.sidebarOpen}>
            <S.Body>
                <SidebarControls />
                <S.Content>
                {isSuccess ?
                    <SidebarContent />
                :
                    <SidebarLoadingContent />
                }
                </S.Content>
                <SidebarHide />
            </S.Body>
            <S.Selectors>
                {tabSelectors}
            </S.Selectors>
        </S.Root>
    )
}