import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import Loading from '@atoms/loading';
import SidebarControls from '@molecules/sidebar-controls';
import SidebarTabSelect from '@molecules/sidebar-tab-select';
import { RootState, GameEntity } from '@/types';
import { useSelector } from 'react-redux';
import * as S from './styled';
import { useGetAllRacesQuery } from '@/api/races.api';
import { useGetAllFeatsQuery } from '@/api/feats.api';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import SidebarContent from '@molecules/sidebar-content';
import { useGetAllBoonsQuery } from '@/api/boons.api';

export default function Sidebar() {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {selectedTab} = sidebarState;

    const queries = {
        dndClasses: useGetAllClassesQuery(),
        features: useGetAllFeaturesQuery(),
        races: useGetAllRacesQuery(),
        feats: useGetAllFeatsQuery(),
        boons: useGetAllBoonsQuery()
    };

    const entities = useSelector( (state:RootState) => ({
        dndClasses: state.entities.dndClasses,
        features: state.entities.features,
        races: state.entities.races,
        feats: state.entities.feats,
        boons: state.entities.boons
    }))

    const tabSelectors = Object.keys(entities).map( (key) => {
        const tab = key as GameEntity;
        return(
            <SidebarTabSelect 
                key={tab}
                tab={tab}
            />
        )
    });

    return(
        <S.Root>
            <S.Selectors>
                {tabSelectors}
            </S.Selectors>
            <S.Body>
                <SidebarControls />
                <S.Content>
                {queries[selectedTab].isSuccess ?
                    <SidebarContent />
                :
                    <Loading />
                }
                </S.Content>
            </S.Body>
        </S.Root>
    )
}