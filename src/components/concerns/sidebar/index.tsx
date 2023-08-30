import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import Loading from '@atoms/loading';
import SidebarControls from '@/components/concerns/sidebar/sidebar-controls';
import SidebarTabSelect from '@/components/concerns/sidebar/sidebar-tab-select';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import * as S from './styled';
import { useGetAllRacesQuery } from '@/api/races.api';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import SidebarContent from '@/components/concerns/sidebar/sidebar-content';
import { useGetAllSpellsQuery } from '@/api/spells.api';
import { useGetAllItemsQuery } from '@/api/items.api';
import SidebarHide from './sidebar-hide';
import { Entity } from '@/enums';

export default function Sidebar() {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {selectedTab} = sidebarState;

    const queries = {
        dndClasses: useGetAllClassesQuery(),
        features: useGetAllFeaturesQuery(),
        races: useGetAllRacesQuery(),
        spells: useGetAllSpellsQuery(),
        items: useGetAllItemsQuery()
    };

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
                {queries[selectedTab].isSuccess ?
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