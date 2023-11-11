import Loading from '@/components/UI/loading';
import SidebarControls from '@/components/pages/dashboard/sidebar/sidebar-controls';
import SidebarTabSelect from '@/components/pages/dashboard/sidebar/sidebar-tab-select';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import * as S from './styled';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import SidebarContent from '@/components/pages/dashboard/sidebar/sidebar-content';
import SidebarHide from './sidebar-hide';
import { Entity } from '@/enums';
import { useGetAllEntitiesQuery } from '@/api/entities.api';

export default function Sidebar() {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {selectedTab} = sidebarState;

    const { isSuccess } = useGetAllEntitiesQuery();

    const entities = useSelector( (state:RootState) => ({
        dndClasses: state.entities.dndClasses,
        features: state.entities.features,
        races: state.entities.races,
        spells: state.entities.spells,
        items: state.entities.items
    }))

    const tabSelectors = Object.keys(entities).map( (key) => {
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
                    <Loading />
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